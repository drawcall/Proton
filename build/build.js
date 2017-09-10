var fs = require("fs"),
    uglify = {
        parser: require("./lib/parse-js.js"),
        processor: require("./lib/process.js")
    },

    // Set the config filename
    configfile = "config",

    config, version, source_dir, output_full, output_min, head, umd, filenames, foot, i,
    ast, minified_source,

    files = [],
    numFiles = 0,

    source = "";

// Get config file
console.log("Reading config file...");
config = fs.readFileSync(configfile, "UTF-8");

// Get variables from config file
version = /^version = (.*)$/m.exec(config)[1],
    source_dir = /^source_dir = (.*)$/m.exec(config)[1],
    output_full = /^output_full = (.*)$/m.exec(config)[1].replace("{version}", version),
    output_min = /^output_min = (.*)$/m.exec(config)[1].replace("{version}", version),
    head = /head\s-----\s([\s\S]*?)-----\s/g.exec(config)[1].replace("{version}", version).replace("{year}", "2011-" + (new Date()).getFullYear()),
    umd = /umd\s-----\s([\s\S]*?)-----\s/g.exec(config)[1],
    filenames = /files\s-----\s([\s\S]*?)\s-----/g.exec(config)[1].split(/\s/);

numFiles = filenames.length;

// Get all the source files
for (i = 0; i < filenames.length; i++) {
    console.log("Reading file: " + filenames[i]);

    // Add current file
    files.push({
        name: filenames[i],
        content: fs.readFileSync(source_dir + filenames[i], "UTF-8")
    });
}

// Start the building process
console.log("Building source file...");

source = head + umd;
for (i = 0; i < numFiles; i++) {

    if (files[i].name === "core/Proton.js") {
        files[i].content = files[i].content.replace(/\}(\s|)\)(\s|)\(window(\s|)\);/, "");
        files[i].content = files[i].content.replace(/\(function\(window\,\sundefined\)\s\{/, "");
        files[i].content = files[i].content.replace(/window\.Proton\s\=\sProton\;/, "");
    } else {
        files[i].content = files[i].content.replace(/\(function(\s|)\((\s|)Proton,(\s|)undefined(\s|)\)(\s|)\{/, "");
        files[i].content = files[i].content.replace(/\}(\s|)\)(\s|)\((\s|)Proton(\s|)\);/, "");
    }

    // Append the file to the full source
    source += "\n" + files[i].content;

    // Append the end of the core wrapper
    if (i === numFiles - 1) {
        //source += "\n})(window);";
        source += "\n\n    return Proton;\n}));";
    }
}
///console.log(umd);
// Save source to output file
fs.writeFile(output_full, source, "UTF-8");
console.log("Source file saved as: " + output_full);

// Run UglifyJS to minify the source
console.log("Minifying source with UglifyJS...");
ast = uglify.parser.parse(source);
ast = uglify.processor.ast_mangle(ast);
ast = uglify.processor.ast_squeeze(ast);
ast = uglify.processor.ast_squeeze_more(ast);
minified_source = uglify.processor.gen_code(ast);

// Save minified source file
fs.writeFile(output_min, head + minified_source, "UTF-8");
console.log("Minified source file saved as: " + output_min);
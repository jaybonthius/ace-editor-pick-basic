define('ace/mode/pick', [], function(require, exports, module) {

var oop = require("ace/lib/oop");
var TextMode = require("ace/mode/text").Mode;
var Tokenizer = require("ace/tokenizer").Tokenizer;
var ExampleHighlightRules = require("ace/mode/example_highlight_rules").ExampleHighlightRules;

var Mode = function() {
    this.HighlightRules = ExampleHighlightRules;
};
oop.inherits(Mode, TextMode);

// (function() {
//     this.lineCommentStart = "!";
//     this.blockComment = {start: "->", end: "<-"};
// }).call(Mode.prototype);

exports.Mode = Mode;
});

define('ace/mode/example_highlight_rules', [], function(require, exports, module) {

var oop = require("ace/lib/oop");
var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

var ExampleHighlightRules = function() {

    var keyword_storage = (
        "abs|abss|adds|access|alpha|ands|ascii|assigned|before|bitchange|bitcheck|bitreset|bitsetbytelen|change|char|chars|chdir|checksum|col1|col2|convert|convertcos|cos|count|counts|create|date|dcount|decrypt|defc|defce|deffun|downcase|dquote|dround|dtx|dyntoxmlebcdic|ebcdic|encrypt|ereplace|error|exchange|exp|extract|field|fields|fmt|fmts|fold|getcwd|getenv|getlist|iconv|iconvs|index|inmat|insert|int|isalnumisdigit|isalpha|iscntrl|islower|isprint|isspace|isupper|itype|jbasecoredump|jbasethreadcreate|jbasethreadstatus|jqlexecute|jqlcompile|jqlfetch|jqlgetproperty|jqlputproperty|latin1|left|len|lendp|lens|ln|localdate|localtim|locate|lowcase|lower|maketimestamp|maximum|minimum|mod|mods|not|num|occurs|oconv|oconvs|pwr|rem|replace|rnd|scan|sentence|seq|seqs|sin|sort|soundex|space|spaces|sqrt|squote|status|str|sum|summation|swap|system|tan|time|timedate|timediff|timeout|timestamp|trim|trimb|trimbs|trimf|trimfs|unassigned|uniquekey|upcase|utf8|xlate|xmltodyn|xmltoxml|xtd"
    );
    var keyword_other = (
        "capturing|do|else|locked|onerr|on error|setting|until|while"
    );
    var keyword_operator = (
        "and|cat|div|divd|divs|eq|equ|eqs|ge|ges|gt|le|les|lt|match|matchfield|ne|negs|nes|or|smul"
    );
    var keyword_control = (
        "begin case|begin work|break|commit work|continue|debug|end|end case|case|exit|for|go|gosub|goto|group|if|ifr|ifs|inputtrap off|inputtrap|loop|next|repeat|return|rollback work|sleep|stop|then|to|wake"
    );
    var support_function = (
        "abort|aux|casing|cats|changetimestamp|clear|cleardata|clearfile|clearinput|clearselect|compare|convert|crt|data|del|delete|echo|equate|error|find|findstr|flush|footing|format|formlist|function|get|getx|getusergroup|heading|headinge|headingn|hush|in|input|inputclear|inputctrl|inputerr|inputnull|inputparity|ins|key|keyin|let|locate|mat|matbuild|matparse|null|out|page|precision|print on|printchar|printer|print|procread|procwrite|prompt|remove|replace|rewind|root|rqm|send|sendx|spoolq|ta|tcl|tclread"
    );
    var support_type = (
        "\$include|\$options|cfunction|clearcommon|common|collectdata|dim|dimension|include"
    );
    var storage_type = (
        "transaction|transaction abort|transaction cache|transaction commit|transaction flush|transaction rollback|transaction start|close|closeseq|deletelist|deleteseq|deleteu|file|fileinfo|filelock|fileunlock|from|getlist|lock|matread|matreadu|matwrite|matwriteu|on|open|release|read|readnext|readt|readtx|readv|select|unlock|weof|weofseq|write|writeblk|writelist|writeseq|writet|writeu|writev|writevu|writex|writexml"
    );
    var support_class = (
        "\$chain|call|callc|calldotnet|callj|callonexit|chain|enter|execute|udtexecute"
    );

    var keywordMapper = this.createKeywordMapper({
        "variable.language": "pick",
        // "keyword": keyword_storage + keyword_other + keyword_operator + keyword_control + support_function + support_type + support_class + storage_type,
        "keyword.storage": keyword_storage + storage_type,
        "keyword.other": keyword_other,
        "keyword.operator": keyword_operator,
        "keyword.control": keyword_control,
        // "storage.type": storage_type,
        "support.type": support_type,
        "support.class": support_class,
        "support.function": support_function,
        "constant.language":
            "true|false|null"
    }, "text", true);

    this.$rules = {
        "start": [
            // {
            //     token: "comment",
            //     regex: "->",
            //     next: [{
            //         regex: "<-",
            //         token: "comment",
            //         next: "start"
            //     }, {
            //         defaultToken: "comment"
            //     }]
            {
                token: keywordMapper,
                regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
                // regex: "\\w+\\b"
            },
            {
                token: "comment",
                regex: "; \\*.*"
            },
            {
                token: "comment",
                regex: ";\\*.*"
            },
            {
                token: "comment",
                regex: "\\*.*"
            },
            {
                token: "string",
                regex: '"',
                next: [
                {
                    regex: '"',
                    token: "string",
                    next: "start"
                }, {
                    defaultToken: "string"
                }]
            },
            {
                token: "string",
                regex: '\'',
                next: [
                {
                    regex: '\'',
                    token: "string",
                    next: "start"
                }, {
                    defaultToken: "string"
                }]
            },
            {
                token : "constant.numeric", // hexadecimal, octal and binary
                regex : /0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/
            }, {
                token : "constant.numeric", // decimal integers and floats
                regex : /(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/
            }
            // {
            //     token: "constant.numeric",
            //     regex: "/\d+(?:[.](\d)*)?|[.]\d+/"
            // }
        ]
    };
    this.normalizeRules()
};

oop.inherits(ExampleHighlightRules, TextHighlightRules);

exports.ExampleHighlightRules = ExampleHighlightRules;
});

var editor = ace.edit("editor");
editor.session.setMode("ace/mode/pick");
editor.setTheme("ace/theme/xcode");
// var langTools = ace.require("ace/ext/language_tools");
editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true
});
// var myCompleter = {
//     getCompletions: function(editor, session, pos, prefix, callback) {
//         var wordList = ["gh"];
//         callback(null, wordList.map(function(word) {
//             return {
//                 caption: word,
//                 value: word
//             };
//         }));
//     }
// };
// langTools.addCompleter(myCompleter);
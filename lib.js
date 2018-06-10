function template(str) {
    var regex = /<%=([\s\S]+?)%>|<%([\s\S]+?)%>|$/g;
    var source = '';
    var index = 0;
    str.replace(regex, function(express, match, jsExpress, offset, tpl) {
        if (str.slice(index, offset)) {
            source += '\n__p +="' + str.slice(index, offset) + '"';
        }
        index = offset + express.length;
        if (match) {
            source += '+' + match;
        } else if (jsExpress) {
            source += '\n' + jsExpress + '\n';
        }
        console.log(arguments, source, match);
        return match;
    });
    source = '\nwith(obj || {}){' + source + '}';
    source = 'var __p=""' + source + '\nreturn __p';
    var render = new Function('obj', source);
    console.log(render);
    return render;
}
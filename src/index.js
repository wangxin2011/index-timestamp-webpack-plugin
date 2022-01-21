class ScriptTimestampWebpackPlugin {
  // 接收参数
  constructor(options) {
    this.options = options || {};
  }
  apply(compiler) {
    compiler.hooks.compilation.tap('SetScriptTimestampPlugin',
      (compilation, callback) => {
        var _options = this.options;
        compilation.plugin(
          "html-webpack-plugin-before-html-processing",
          function (htmlPluginData, callback) {
            // let jsScr = htmlPluginData.assets.js[0];
            // htmlPluginData.assets.js = [];
            if(_options){
              var _files = _options.files;
              if(_files){
                var resultHTML = htmlPluginData.html;
                if(typeof _files == 'string'){
                   // 字符串
                   console.log("******jsScr********", htmlPluginData.assets.js);
                   resultHTML = htmlPluginData.html.replace(
                    _files, _files+'?v=' + new Date().getTime()
                   );
                }else{
                  for(var i = 0; i < _files.length; i++){
                    var _file = _files[i];
                    resultHTML = htmlPluginData.html.replace(
                      _file, _file+'?v=' + new Date().getTime()
                     );
                  }
                }
               
                // 返回修改后的结果
                htmlPluginData.html = resultHTML;
              }
            }
          }
        );
      }
    );
  }
}
module.exports = ScriptTimestampWebpackPlugin;

class ScriptTimestampWebpackPlugin {
  // 接收参数
  constructor(options) {
    this.options = options || {};
  }
  apply(compiler) {
    compiler.hooks.compilation.tap('SetScriptTimestampPlugin',
      (compilation, callback) => {
        let _options = this.options;
        compilation.plugin(
          "html-webpack-plugin-before-html-processing",
          function (htmlPluginData, callback) {
            // let jsScr = htmlPluginData.assets.js[0];
            // htmlPluginData.assets.js = [];
            console.log(_options)
            if(_options){
              let _targe = _options.str;
              if(_targe){
                console.log("******jsScr********", htmlPluginData.assets.js);
                let resultHTML = htmlPluginData.html.replace(
                  _targe, _targe+'?v=' + new Date().getTime()
                );
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

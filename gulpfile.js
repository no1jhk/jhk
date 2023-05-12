let fs=require("fs"),gulp=require("gulp"),_debugMode=!0,_includeB=!0,_html_ejs="html",_ftp_type="sftp",project_name="project_folder_name",protNum=1e3,sftp_server={host:"218.236.25.246",user:"root",pass:"",port:"50022",path:"/home/WEB_SOURCE/"+project_name},ftp_server={host:"turfrain.co.kr",user:"dev00",pass:"",port:"21",path:"/HDD2/www/"+project_name},ftpPath={local_files:["root/**/*","!root/dev_html/**/*","!root/dev_inc/**/*"],local_PATHfiles:["root/guide/**/*"],local_HTMLfiles:["root/html/**/*"],local_CSSfiles:["root/resources/css/**/*.css","root/resources/css/**/iconfont.*"],local_JSfiles:["root/resources/js/**/*.js"],local_IMGfiles:["root/resources/images/**/*"],local_ZIPfiles:["./*.zip"]},ftpconfig_path="../gulpftp.config.js",ftpconfig={sftpPass:"",ftpPass:""},zipPath={local_ALLfiles:["root/**/*","!root/dev_html/","!root/dev_ejs/","!root/dev_inc/","!root/dev_html/**","!root/dev_ejs/**","!root/dev_inc/**"],local_HTMLfiles:["root/html/**/*"],local_CSSfiles:["root/resources/css/**/*.css","root/resources/css/**/iconfont.*",,"!root/resources/css/maps/*"],local_JSfiles:["root/resources/js/**/*.js","!root/resources/js/maps/*"],local_IMGfiles:["root/resources/images/**/*"],local_RESOURCES:["root/resources/**/*","!root/resources/css/maps/","!root/resources/js/maps/","!root/resources/css/maps/**","!root/resources/js/maps/**"]},pRoot="root/",dir={template:"sprite.support_1x.mustache",templateMb:"sprite.support_2x.mustache",dist_html:pRoot+"/",dist_guide:pRoot+"guide/",dist_resources:pRoot+"resources/",dist_scripts:pRoot+"resources/js/",dist_style:pRoot+"resources/css/",dist_images:pRoot+"resources/images/",dev_html:pRoot+"dev_html/",dev_ejs:pRoot+"dev_ejs/",dev_inc:pRoot+"dev_inc/",dev_style:pRoot+"dev_inc/scss/",dev_scripts:pRoot+"dev_inc/js/",dev_images:pRoot+"dev_inc/images/",dev_imagesSp:pRoot+"dev_inc/imagesSp/",dev_imagesSpJs:pRoot+"guide/@iconlist.js",dev_imagesSpScss:pRoot+"dev_inc/scss/lib/spritesmith/",dist_DMhtml:pRoot+"html/dm/",dev_DMstyle:pRoot+"dev_inc/scss/dm/",dev_DMhtml:pRoot+"dev_html/dm/",dev_DMejs:pRoot+"dev_ejs/dm/"},gulpConfigJson=(fs.existsSync(ftpconfig_path)&&(ftpconfig=require(ftpconfig_path),sftp_server.pass=ftpconfig.sftpPass,ftp_server.pass=ftpconfig.ftpPass),"./gulp.config.json");function config_read(){fs.access(gulpConfigJson,fs.constants.F_OK,e=>{if(e)return console.log(error),done()});var e=JSON.parse(fs.readFileSync(gulpConfigJson,"utf8"));_debugMode=e.debugMode,project_name=e.projectName,protNum=Number(e.protNum),sftp_server.path="/home/WEB_SOURCE/"+project_name,console.log("<<<<<<<<<<<<<<<<<<<<",project_name,protNum,">>>>>>>>>>>>>>>>>>>>")}var spritesmith=require("gulp.spritesmith"),sizeOf=require("image-size"),imagemin=require("gulp-imagemin"),iconfont=require("gulp-iconfont"),iconfontCss=require("gulp-iconfont-css"),merge=require("merge-stream"),sass=require("gulp-sass"),autoprefixer=require("gulp-autoprefixer"),babel=require("gulp-babel"),concat=require("gulp-concat"),uglifyjs=require("uglify-js"),uglifyfier=require("gulp-uglify/composer"),uglifyoption=uglifyfier(uglifyjs,console),uglify=require("gulp-uglify"),ts=require("gulp-typescript"),tsProject=ts.createProject("tsconfig.json"),cssbeautify=require("gulp-cssbeautify"),minifyCSS=require("gulp-clean-css"),lineec=require("gulp-line-ending-corrector"),sourcemaps=require("gulp-sourcemaps"),rename=require("gulp-rename"),fileinclude=require("gulp-file-include"),ejs=require("gulp-ejs"),htmlbeautify=require("gulp-html-beautify"),changed=require("gulp-changed"),path=require("path"),del=require("del"),zip=require("gulp-zip"),gutil=require("gulp-util"),ftp=require("vinyl-ftp"),sftp=require("gulp-sftp-up4"),gulpif=require("gulp-if"),inlineCss=require("gulp-inline-css"),browserSync=require("browser-sync").create(),reload=browserSync.reload,jsoptions={debug:{compress:{drop_console:!1},mangle:!1,output:{beautify:!0,comments:"all"}},build:{compress:{drop_console:!0},mangle:!0,output:{beautify:!0,comments:"all"}}},cssOptions={indent:"  ",openbrace:"end-of-line",autosemicolon:!0};function debugModeFn(){fs.access(gulpConfigJson,fs.constants.F_OK,e=>{if(e)return console.log(error),done()});var e=JSON.parse(fs.readFileSync(gulpConfigJson,"utf8"));return e.debugMode=!0,fs.writeFileSync(gulpConfigJson,JSON.stringify(e),"utf-8"),console.log("==== debug Mode start ====="),del([dir.dist_resources+"**/maps/"])}function buildModeFn(){fs.access(gulpConfigJson,fs.constants.F_OK,e=>{if(e)return console.log(error),done()});var e=JSON.parse(fs.readFileSync(gulpConfigJson,"utf8"));return e.debugMode=!1,fs.writeFileSync(gulpConfigJson,JSON.stringify(e),"utf-8"),console.log("==== build Mode start ====="),del([dir.dist_resources+"**/maps/",dir.dist_html+"**/*.html"])}function buildModeHtml(){fs.access(gulpConfigJson,fs.constants.F_OK,e=>{if(e)return console.log(error),done()});var e=JSON.parse(fs.readFileSync(gulpConfigJson,"utf8"));return e.debugMode=!1,fs.writeFileSync(gulpConfigJson,JSON.stringify(e),"utf-8"),console.log("==== build Mode start ===== html"),del([dir.dist_html+"**/*.html"])}function buildModeEtc(){fs.access(gulpConfigJson,fs.constants.F_OK,e=>{if(e)return console.log(error),done()});var e=JSON.parse(fs.readFileSync(gulpConfigJson,"utf8"));return e.debugMode=!1,fs.writeFileSync(gulpConfigJson,JSON.stringify(e),"utf-8"),console.log("==== build Mode start ===== Etc"),del([dir.dist_resources+"**/maps/"])}function guidelist(e){fs.readdir("./root/guide",function(e,s){var i,t,r,p=new Array;for(t in s)s[t].endsWith(".html")&&p.push(s[t]);for(r in i="var guideList = [",p)r<=p.length-2?i+="'"+p[r]+"',":i+="'"+p[r]+"'";i+='];\nif(guideList != undefined){\n  for(var i = 0; i < guideList.length; i++){\n    var _item = "<option value="+ guideList[i] +">"+ guideList[i] +"</option>";\n    $("#select_guid-list").append(_item);\n  }\n  $("#select_guid-list").on("change",function(){\n    window.open( $(this).val() );\n  })\n}\n',fs.writeFile(dir.dist_guide+"@guide_filelist.js",i,function(e){null===e?console.log("===success==="):console.log("===fail===")})}),e()}function gulpmin(){return gulp.src("./gulpfile_ORG.js").pipe(concat("gulpfile.js",{newLine:";"})).pipe(uglify()).pipe(lineec()).pipe(gulp.dest("./"))}function y_md_hm(e){var s=new Date;return"?v="+s.getFullYear()+"_"+(s.getMonth()+1)+s.getDate()+"_"+s.getHours()+s.getMinutes()}function jquery(){return gulp.src([path.join(__dirname,"node_modules/jquery/dist/jquery.min.js")]).pipe(concat("jquery.min.js")).pipe(gulp.dest(dir.dist_scripts+"library/"))}function libraryImages(){return gulp.src([dir.dev_scripts+"library/css/images/**/*"]).pipe(gulp.dest(dir.dist_style+"library/images/"))}function libraryConcatCss(){return gulp.src([dir.dev_scripts+"library/css/*.css"]).pipe(concat("csslibrary.css")).pipe(gulp.dest(dir.dist_style+"library/")).pipe(concat("csslibrary.min.css")).pipe(minifyCSS()).pipe(lineec()).pipe(gulp.dest(dir.dist_style+"library/"))}function libraryConcatJs(){return gulp.src([dir.dev_scripts+"library/*.js"]).pipe(concat("jquerylibrary.js",{newLine:";"})).pipe(gulp.dest(dir.dist_scripts+"library/")).pipe(uglify()).pipe(lineec()).pipe(concat("jquerylibrary.min.js",{newLine:";"})).pipe(gulp.dest(dir.dist_scripts+"library/"))}function imagesmin(){return gulp.src(dir.dev_images+"**/*").pipe(imagemin([imagemin.gifsicle({interlaced:!0}),imagemin.mozjpeg({quality:90,progressive:!0}),imagemin.optipng({optimizationLevel:5})])).pipe(gulp.dest(dir.dist_images+""))}function iconfonts(){return gulp.src([dir.dev_imagesSp+"svg/spfs/*.svg"],{base:dir.dev_imagesSp}).pipe(iconfontCss({fontName:"iconfont",path:dir.dev_style+"lib/iconfont/iconfont_template.scss",targetPath:"../../../dev_inc/scss/lib/iconfont/_sp_iconfont.scss",fontPath:"./fonts/",cssClass:"spf",cacheBuster:y_md_hm()})).pipe(iconfont({fontName:"iconfont",formats:["ttf","eot","woff","svg","woff2"],prependUnicode:!0,normalize:!0,fontHeight:1001})).on("codepoints",function(e,s){console.log(e,s)}).pipe(gulp.dest(dir.dist_style+"fonts/"))}function iconFontsListJson(e){getFolders(dir.dev_imagesSp+"svg/").map(function(l){var o="";fs.readdir(dir.dev_imagesSp+"svg/"+l,function(e,s){var i,t,r,p=new Array;for(i in s)s[i].endsWith(".svg")&&(_pngInfo=sizeOf(dir.dev_imagesSp+"svg/"+l+"/"+s[i]),(t=new Object).name=s[i].split(".")[0],p.push(t));for(r in o=o+"{\n"+('  "'+l+'fonts_list" : ['),p)r<=p.length-2?o+='"'+p[r].name+'",':o+='"'+p[r].name+'"';o+="]\n}\n",fs.writeFile(dir.dist_guide+"@"+l+"fonts_list.json",o,function(e){null===e?console.log("===iconfontlist_success : "+dir.dist_guide+"@"+l+"fonts_list.json ==="):console.log("===iconfontlist_fail=== : "+dir.dist_guide+"@"+l+"fonts_list.json ===")})})});e()}function spriteimg(){var e,i,t,s=getFolders(dir.dev_imagesSp+"sprite/");return s.map(function(s){t=gulp.src("sprite/"+s+"/*.png",{cwd:dir.dev_imagesSp+""}).pipe(spritesmith({imgPath:"../images/common/sp_"+s+".png",imgName:"sp_"+s+".png",cssName:"_sp_"+s+".scss",algorithm:"binary-tree",padding:20,cssTemplate:dir.dev_style+"lib/spritesmith/"+dir.template,cssVarMap:function(e){e.name=e.name,e.origin="sp_"+s},cssSpritesheetName:"sp_"+s})),e=t.img.pipe(gulp.dest(dir.dist_images+"common")),i=t.css.pipe(gulp.dest(dir.dev_style+"lib/spritesmith/"))}),merge(e,i)}function spriteimg_mb(){var e,i,t,s=getFolders(dir.dev_imagesSp+"sprite-mb/");return s.map(function(s){t=gulp.src("sprite-mb/"+s+"/*.png",{cwd:dir.dev_imagesSp+""}).pipe(spritesmith({imgPath:"../images/common/sp_"+s+".png",imgName:"sp_"+s+".png",cssName:"_sp_"+s+".scss",cssFormat:"scss",algorithm:"binary-tree",padding:20,cssTemplate:dir.dev_style+"lib/spritesmith/"+dir.templateMb,cssVarMap:function(e){e.name=e.name,e.origin="sp_"+s},cssSpritesheetName:"sp_"+s})),e=t.img.pipe(gulp.dest(dir.dist_images+"common")),i=t.css.pipe(gulp.dest(dir.dev_style+"lib/spritesmith/"))}),merge(e,i)}function spriteimgX(){var e,i,t;return getFolders(dir.dev_imagesSp+"sprite/").map(function(s){t=gulp.src("sprite/"+s+"/*.png",{cwd:dir.dev_imagesSp+""}).pipe(spritesmith({imgPath:"../images/common/sp_"+s+".png"+y_md_hm(),imgName:"sp_"+s+".png",cssName:"_sp_"+s+".scss",cssFormat:"scss",algorithm:"binary-tree",padding:10,cssTemplate:dir.dev_style+"lib/spritesmith/templateX2.mustache",cssVarMap:function(e){e.name=e.name,e.origin="sp_"+s},cssSpritesheetName:"sp_"+s,cssOpts:{functions:!1}})),e=t.img.pipe(gulp.dest(dir.dist_images+"common")),i=t.css.pipe(gulp.dest(dir.dev_style+"lib/spritesmith/"))}),merge(e,i)}function iconListJson(e){getFolders(dir.dev_imagesSp+"sprite/").map(function(l){var o="";fs.readdir(dir.dev_imagesSp+"sprite/"+l,function(e,s){var i,t,r,p=new Array;for(i in s)s[i].endsWith(".png")&&(_pngInfo=sizeOf(dir.dev_imagesSp+"sprite/"+l+"/"+s[i]),(t=new Object).name=s[i].split(".")[0],t.width=_pngInfo.width,t.height=_pngInfo.height,p.push(t));for(r in o=o+"{\n"+('  "'+l+'_list" : ['),p)r<=p.length-2?o+='"'+p[r].name+'",':o+='"'+p[r].name+'"';for(r in o=o+"],\n"+('  "'+l+'_width" : ['),p)r<=p.length-2?o+='"'+p[r].width+'",':o+='"'+p[r].width+'"';for(r in o=o+"],\n"+('  "'+l+'_height" : ['),p)r<=p.length-2?o+='"'+p[r].height+'",':o+='"'+p[r].height+'"';o+="]\n}\n",fs.writeFile(dir.dist_guide+"@"+l+"_list.json",o,function(e){null===e?console.log("===iconlist_success : "+dir.dist_guide+"@"+l+"_list.json ==="):console.log("===iconlist_fail=== : "+dir.dist_guide+"@"+l+"_list.json ===")})})});e()}function iconListScss(e){getFolders(dir.dev_imagesSp+"sprite/").map(function(n){fs.readdir(dir.dev_imagesSp+"sprite/"+n,function(e,s){var i,t,r,p,l=new Array,o="";for(i in s)s[i].endsWith(".png")&&(t=sizeOf(dir.dev_imagesSp+"sprite/"+n+"/"+s[i]),(r=new Object).name=s[i].split(".")[0],r.width=t.width,r.height=t.height,l.push(r));for(p in o+='@charset "utf-8";\n',l)o=l[p].name.indexOf("@")<0?(o+="."+l[p].name+" {  display: inline-block;  width:"+l[p].width+"px; height:"+l[p].height+"px;\n")+'  &::after { content: ""; display: block;  @include sp_icons($'+l[p].name+");  }\n}\n \n":(o=(o=(o+="."+l[p].name.replace("@","-")+" {  display: inline-block;  width:"+l[p].width/2+"px; height:"+l[p].height/2+"px;\n")+'  &::after { content: ""; display: block;  @include sp_icons2x($'+l[p].name.replace("@","-")+");  }\n}\n@media screen and (max-width: $G-wMobile) { \n")+"  ."+l[p].name.split("@")[0]+" {  display: inline-block;  width:"+l[p].width/2+"px; height:"+l[p].height/2+"px;\n")+'    &::after { content: ""; display: block;  @include sp_icons2x($'+l[p].name.replace("@","-")+");  }\n  }\n}\n \n";fs.writeFile(dir.dev_imagesSpScss+"_"+n+"_list.scss",o,function(e){null===e?console.log("===iconscss_success : "+dir.dev_imagesSpScss+"_"+n+"_list.scss==="):console.log("===iconscss_fail : "+dir.dev_imagesSpScss+"_"+n+"_list.scss===")})})}),e()}function dmStyles(){return gulp.src(dir.dev_DMstyle+"*.scss").pipe(sass({outputStyle:"nested"}).on("error",sass.logError)).pipe(gulp.dest(dir.dev_DMstyle))}function dmHtml(){var e="html"==_html_ejs?dir.dev_DMhtml+"*.html":dir.dev_DMejs+"*.ejs";return gulp.src(e).pipe(inlineCss()).pipe(rename({extname:".html"})).pipe(gulp.dest(dir.dist_DMhtml))}function styles(){return config_read(),_debugMode?console.log("==== debug Mode start : styles ====="):console.log("==== build Mode start : styles ====="),gulp.src(dir.dev_style+"*.scss").pipe(gulpif(_debugMode,sourcemaps.init({loadMaps:!1}))).pipe(gulpif(_debugMode,sass.sync({outputStyle:"expanded"}),sass.sync({outputStyle:"compact"})).on("error",sass.logError)).pipe(gulpif(!_debugMode,cssbeautify(cssOptions))).pipe(lineec()).pipe(gulpif(_debugMode,sourcemaps.write("./maps"))).pipe(gulp.dest(dir.dist_style)).pipe(minifyCSS()).pipe(rename({extname:".min.css"})).pipe(gulp.dest(dir.dist_style))}function ts_script(){return gulp.src(dir.dev_scripts+"ts/*.ts").pipe(sourcemaps.init()).pipe(tsProject()).pipe(sourcemaps.write("./maps")).pipe(gulp.dest(dir.dev_scripts))}getFolders=function(s){return fs.readdirSync(s).filter(function(e){return fs.statSync(path.join(s,e)).isDirectory()})},exports.guidelist=guidelist,exports.gulpmin=gulpmin,exports.y_md_hm=y_md_hm;var lib={dev:[dir.dev_scripts+"*.js"],dist:[dir.dev_scripts+"*.js","!"+dir.dev_scripts+"@debug_v1.0.js"]};function js_script(){return gulp.src(gulpif(_debugMode,lib.dev,lib.dist),{sourcemaps:!0,base:dir.dev_scripts}).pipe(babel()).pipe(concat("common_pub.js",{newLine:";"})).pipe(gulpif(_debugMode,uglifyoption(jsoptions.debug),uglifyoption(jsoptions.build))).pipe(gulp.dest(dir.dist_scripts,{sourcemaps:"./maps"}))}function scriptMin(){return gulp.src(dir.dist_scripts+"common_pub.js",{sourcemaps:!1}).pipe(uglify()).pipe(lineec()).pipe(rename({extname:".min.js"})).pipe(gulp.dest(dir.dist_scripts))}function fileAll(e){return _includeB=!0,e()}function fileOne(e){return _includeB=!1,e()}var beatifyOptions={indentSize:4,indent_with_tabs:!1};function fileincludes(){return gulp.src([dir.dev_html+"**/*.html","!"+dir.dev_html+"include/*.html"],{base:dir.dev_html}).pipe(gulpif(!_includeB,changed(dir.dist_html,{extension:".html"}))).pipe(fileinclude({prefix:"@@",basepath:"@file"})).pipe(htmlbeautify(beatifyOptions)).pipe(gulp.dest(dir.dist_html))}function file_ejs(){return gulp.src([dir.dev_ejs+"**/*.ejs","!"+dir.dev_ejs+"include/*.ejs"],{base:dir.dev_ejs}).pipe(gulpif(!_includeB,changed(dir.dist_html,{extension:".html"}))).pipe(ejs({title:"gulp-ejs"})).pipe(rename({extname:".html"})).pipe(htmlbeautify(beatifyOptions)).pipe(gulp.dest(dir.dist_html))}function sftp_upload(e,s){return config_read(),Array.isArray(e)&&(local_files=e),""==sftp_server.pass?new Promise(function(e,s){console.log("======= sftp up pass"),e()}):(e=s?"./":"root/",gulp.src(local_files,{base:e,buffer:!1}).pipe(sftp({host:sftp_server.host,user:sftp_server.user,pass:sftp_server.pass,port:sftp_server.port,remotePath:sftp_server.path})))}function sftp_PATHupload(e){return sftp_upload(ftpPath.local_PATHfiles),e()}function sftp_HTMLupload(e){return sftp_upload(ftpPath.local_HTMLfiles,""),e()}function sftp_CSSupload(e){return sftp_upload(ftpPath.local_CSSfiles,""),e()}function sftp_JSupload(e){return sftp_upload(ftpPath.local_JSfiles,""),e()}function sftp_IMGupload(e){return sftp_upload(ftpPath.local_IMGfiles,""),e()}function sftp_ZIPupload(e){return sftp_upload(ftpPath.local_ZIPfiles,!0),e()}function ftp_upload(){var e=[],s=process.argv.indexOf("--files"),i="",i=-1!=s?process.argv[s+1]:"all";switch(i=-1!=s?process.argv[s+1]:i){case"path":e=ftpPath.local_PATHfiles;break;case"html":e=ftpPath.local_HTMLfiles;break;case"css":e=ftpPath.local_CSSfiles;break;case"js":e=ftpPath.local_JSfiles;break;case"img":e=ftpPath.local_IMGfiles;break;default:e=ftpPath.local_files}return""==ftp_server.pass?new Promise(function(e,s){console.log("======= ftp pass"),e()}):(s=ftp.create({host:ftp_server.host,user:ftp_server.user,password:ftp_server.pass,port:ftp_server.port,parallel:10,log:gutil.log}),gulp.src(e,{base:"root/",buffer:!1}).pipe(s.newer(ftp_server.path)).pipe(s.dest(ftp_server.path)))}function gulp_zip(e,s){config_read();var i,t="-all-",r=new Date,p=r.getMonth()+1,r=r.getDate(),l="",o=(p<10&&(p="0"+p),r<10&&(r="0"+r),""!=s&&(t="-"+s+"-"),new Array),n=project_name+"["+p+r+"]"+t;try{var u=fs.readdirSync("./")}catch(e){}for(i in u)u[i].endsWith(".zip")&&u[i].substring(0,n.length)==n&&o.push(u[i]);return s=n+"ver_"+o.length+".zip",console.log("filename : "+s),Array.isArray(e)&&(l=e),gulp.src(l).pipe(zip(s)).pipe(gulp.dest("./"))}function watch(){gulp.watch([dir.dev_scripts+"library/**/*"],gulp.series(debugModeFn,gulp.parallel(jquery,libraryConcatCss,libraryConcatJs))),gulp.watch([dir.dev_imagesSp+"svg/**/*"],gulp.series(iconfonts,gulp.parallel(iconFontsListJson),styles)),gulp.watch([dir.dev_imagesSp+"sprite/**/*"],gulp.series(spriteimgX,gulp.parallel(iconListJson,iconListScss),styles)),gulp.watch([dir.dev_style+"**/*.scss","!"+dir.dev_style+"lib/spritesmith/*.scss"],gulp.parallel(styles,dmStyles)),gulp.watch([dir.dev_scripts+"ts/*.ts"],gulp.series(ts_script)),gulp.watch([dir.dev_scripts+"*.js"],gulp.series(js_script,scriptMin)),"html"==_html_ejs?(gulp.watch([dir.dev_html+"include/**/*.html"],gulp.series(fileAll,fileincludes)),gulp.watch([dir.dev_html+"**/*.html","!"+dir.dev_html+"include/**/*.html"],gulp.series(fileOne,fileincludes))):(gulp.watch([dir.dev_ejs+"include/*.ejs"],gulp.series(fileAll,file_ejs)),gulp.watch([dir.dev_ejs+"**/*.ejs","!"+dir.dev_ejs+"include/*.ejs"],gulp.series(fileOne,file_ejs))),gulp.watch([dir.dist_scripts+"**/*.js",dir.dist_images+"common/*.*",dir.dist_style+"**/*.css",dir.dist_html+"**/*.html"]).on("change",reload)}function browser(){return config_read(),browserSync.init({server:pRoot,port:protNum})}var _librarys=gulp.parallel(jquery,libraryImages,libraryConcatCss,libraryConcatJs),_imgmin=gulp.series(imagesmin),_icons=gulp.series(iconfonts,spriteimgX,gulp.parallel(iconFontsListJson,iconListJson,iconListScss)),_edm=gulp.series(dmStyles,dmHtml),_styles=gulp.series(styles),_scripts=gulp.series(ts_script,js_script,scriptMin),_htmls="html"==_html_ejs?fileincludes:file_ejs,base=gulp.series(_librarys,_icons,_scripts,gulp.parallel(_styles,_htmls)),publishing=gulp.series(buildModeFn,_edm,base),publishingAll=gulp.series(publishing,gulp_zip,"sftp"==_ftp_type?sftp_upload:ftp_upload,debugModeFn,gulp.parallel(watch,browser)),bs=gulp.series(debugModeFn,gulp.parallel(watch,browser));function zip_All(e){return gulp_zip(zipPath.local_ALLfiles,""),e()}function zip_Html(e){return gulp_zip(zipPath.local_HTMLfiles,"html"),e()}function zip_Css(e){return gulp_zip(zipPath.local_CSSfiles,"css"),e()}function zip_Js(e){return gulp_zip(zipPath.local_JSfiles,"js"),e()}function zip_Img(e){return gulp_zip(zipPath.local_IMGfiles,"images"),e()}function zip_Src(e){return gulp_zip(zipPath.local_RESOURCES,"resources"),e()}exports.librarys=_librarys,exports.imgmin=_imgmin,exports.icons=_icons,exports.edm=_edm,exports.styles=_styles,exports.scripts=_scripts,exports.htmls=_htmls,gulp.task("default",publishingAll),gulp.task("build",publishing),gulp.task("bs",gulp.series(_htmls,gulp.parallel(watch,browser))),gulp.task("ftp",ftp_upload),gulp.task("sftp",sftp_upload),gulp.task("pathup",sftp_PATHupload),gulp.task("htmlup",sftp_HTMLupload),gulp.task("imgup",sftp_IMGupload),gulp.task("cssup",sftp_CSSupload),gulp.task("jsup",sftp_JSupload),gulp.task("zipup",sftp_ZIPupload),gulp.task("all",gulp.series(buildModeHtml,fileAll,_htmls,_edm,buildModeEtc,_icons,_styles,_librarys,_scripts,sftp_HTMLupload,sftp_IMGupload,sftp_CSSupload,sftp_JSupload,sftp_PATHupload,sftp_ZIPupload,debugModeFn)),gulp.task("path",gulp.series(sftp_PATHupload,debugModeFn)),gulp.task("html",gulp.series(buildModeHtml,fileAll,_htmls,_edm,sftp_HTMLupload,debugModeFn)),gulp.task("img",gulp.series(buildModeEtc,_icons,sftp_IMGupload,debugModeFn)),gulp.task("css",gulp.series(buildModeEtc,_styles,sftp_CSSupload,debugModeFn)),gulp.task("js",gulp.series(buildModeEtc,_librarys,_scripts,sftp_JSupload,debugModeFn)),gulp.task("zip",gulp.series(zip_All)),gulp.task("ziphtml",gulp.series(zip_Html)),gulp.task("zipcss",gulp.series(zip_Css)),gulp.task("zipjs",gulp.series(zip_Js)),gulp.task("zipimg",gulp.series(zip_Img)),gulp.task("zipsrc",gulp.series(zip_Src));
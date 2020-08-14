(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{232:function(t,e,r){"use strict";r.d(e,"f",(function(){return c})),r.d(e,"h",(function(){return o})),r.d(e,"j",(function(){return l})),r.d(e,"a",(function(){return m})),r.d(e,"d",(function(){return f})),r.d(e,"e",(function(){return d})),r.d(e,"b",(function(){return v})),r.d(e,"i",(function(){return h})),r.d(e,"g",(function(){return O})),r.d(e,"k",(function(){return j})),r.d(e,"c",(function(){return _}));var n=r(66),c=function(t){return Object(n.b)({method:"GET",url:"/api/articles",params:t})},o=function(t){return Object(n.b)({method:"GET",url:"/api/articles/feed",params:t})},l=function(data){return Object(n.b)({method:"POST",url:"/api/articles",data:data})},m=function(t){return Object(n.b)({method:"POST",url:"/api/articles/".concat(t,"/favorite")})},f=function(t){return Object(n.b)({method:"DELETE",url:"/api/articles/".concat(t,"/favorite")})},d=function(t){return Object(n.b)({method:"GET",url:"/api/articles/".concat(t)})},v=function(t){return Object(n.b)({method:"DELETE",url:"/api/articles/".concat(t)})},h=function(t,data){return Object(n.b)({method:"PUT",url:"/api/articles/".concat(t),data:data})},O=function(t){return Object(n.b)({method:"GET",url:"/api/articles/".concat(t,"/comments")})},j=function(t,data){return Object(n.b)({method:"POST",url:"/api/articles/".concat(t,"/comments"),data:data})},_=function(t,e){return Object(n.b)({method:"DELETE",url:"/api/articles/".concat(t,"/comments/").concat(e)})}},239:function(t,e,r){"use strict";r.d(e,"a",(function(){return c})),r.d(e,"b",(function(){return o}));var n=r(66),c=function(t){return Object(n.b)({method:"POST",url:"/api/profiles/".concat(t,"/follow")})},o=function(t){return Object(n.b)({method:"DELETE",url:"/api/profiles/".concat(t,"/follow")})}},309:function(t,e,r){"use strict";r.r(e);r(35);var n=r(5),c=r(232),o=r(253),l=r.n(o),m=(r(67),r(25),r(26),r(49),r(10),r(89),r(27)),f=r(37),d=r(239);function v(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var h={name:"ArticleMeta",props:{article:{type:Object,required:!0}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(e){Object(m.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(f.b)(["user"])),data:function(){return{favoriteDisabled:!1,followDisabled:!1}},methods:{edit:function(){this.$router.push({path:"/editor",query:{slug:this.article.slug}})},del:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$confirm("此操作将删除该评论, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.$message({type:"success",message:"删除成功!"})}));case 2:return e.next=4,Object(c.b)(t.article.slug);case 4:t.$router.replace({path:"/profile?username=".concat(t.article.author.username)});case 5:case"end":return e.stop()}}),e)})))()},favoriteFun:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var article,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.favoriteDisabled=!0,article=t.article,r=article.favorited?c.d:c.a,e.next=5,r(t.article.slug).then((function(){article.favorited?article.favoritesCount-=1:article.favoritesCount+=1,article.favorited=!article.favorited})).finally((function(){t.favoriteDisabled=!1}));case 5:case"end":return e.stop()}}),e)})))()},followFun:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.followDisabled=!0,r=t.article.author,n=r.following?d.b:d.a,e.next=5,n(r.username).then((function(){r.following=!r.following})).finally((function(){t.followDisabled=!1}));case 5:case"end":return e.stop()}}),e)})))()}}},O=r(24),j=Object(O.a)(h,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.article.author?r("div",{staticClass:"article-meta"},[r("nuxt-link",{attrs:{to:{path:"/profile?username="+t.article.author.username}}},[r("img",{attrs:{src:t.article.author.image}})]),t._v(" "),r("div",{staticClass:"info"},[r("nuxt-link",{staticClass:"author",attrs:{to:{path:"/profile?username="+t.article.author.username}}},[t._v("\n      "+t._s(t.article.author.username)+"\n    ")]),t._v(" "),r("span",{staticClass:"date"},[t._v(t._s(t._f("date")(t.article.createdAt,"MMM DD, YYYY")))])],1),t._v(" "),t.user&&t.user.username==t.article.author.username?[r("a",{staticClass:"btn btn-outline-secondary btn-sm",on:{click:t.edit}},[r("i",{staticClass:"ion-edit"}),t._v(" Edit Article\n    ")]),t._v(" "),r("button",{staticClass:"btn btn-outline-danger btn-sm",on:{click:t.del}},[r("i",{staticClass:"ion-trash-a"}),t._v(" Delete Article\n    ")])]:[r("button",{staticClass:"btn btn-sm btn-outline-secondary",class:{active:!t.article.author.following},on:{click:t.followFun}},[r("i",{staticClass:"ion-plus-round"}),t._v("\n        "+t._s(t.article.author.following?"Unf":"F")+"ollow\n      "+t._s(t.article.author.username)+"\n      "),r("span",{staticClass:"counter"},[t._v("("+t._s(t.article.author.bio||0)+")")])]),t._v("\n      \n    "),r("button",{staticClass:"btn btn-sm btn-outline-primary",class:{active:!t.article.favorited},on:{click:t.favoriteFun}},[r("i",{staticClass:"ion-heart"}),t._v("\n        "+t._s(t.article.favorited?"Unf":"F")+"avorite Article\n      "),r("span",{staticClass:"counter"},[t._v("("+t._s(t.article.favoritesCount)+")")])])]],2):t._e()}),[],!1,null,null,null).exports;function _(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var w={name:"ArticleComments",props:{article:{type:Object,required:!0}},data:function(){return{disabled:!1,comment:{body:""},comments:[]}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?_(Object(source),!0).forEach((function(e){Object(m.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):_(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(f.b)(["user"])),mounted:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.getComments();case 1:case"end":return e.stop()}}),e)})))()},methods:{publish:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.disabled=!0,e.prev=1,e.next=4,Object(c.k)(t.article.slug,t.comment);case 4:r=e.sent,console.log(r),t.comments.unshift(r.data.comment),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),console.log(e.t0);case 12:t.disabled=!1;case 13:case"end":return e.stop()}}),e,null,[[1,9]])})))()},getComments:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.g)(t.article.slug);case 2:r=e.sent,data=r.data,t.comments=data.comments;case 5:case"end":return e.stop()}}),e)})))()},delComment:function(t,i){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.$confirm("此操作将删除该评论, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.$message({type:"success",message:"删除成功!"})}));case 2:return r.next=4,Object(c.c)(e.article.slug,t);case 4:e.comments.splice(i,1);case 5:case"end":return r.stop()}}),r)})))()}}},C={name:"article",asyncData:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,data,article,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((r=t.query).slug){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,Object(c.e)(r.slug);case 5:return n=e.sent,data=n.data,article=data.article,o=new l.a,article.body=o.render(article.body),e.abrupt("return",{article:article});case 11:case"end":return e.stop()}}),e)})))()},data:function(){return{article:{}}},components:{ArticleMeta:j,ArticleComments:Object(O.a)(w,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("form",{staticClass:"card comment-form",on:{submit:function(e){return e.preventDefault(),t.publish(e)}}},[r("div",{staticClass:"card-block"},[r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.comment.body,expression:"comment.body"}],staticClass:"form-control",attrs:{placeholder:"Write a comment...",rows:"3"},domProps:{value:t.comment.body},on:{input:function(e){e.target.composing||t.$set(t.comment,"body",e.target.value)}}})]),t._v(" "),r("div",{staticClass:"card-footer"},[r("img",{staticClass:"comment-author-img",attrs:{src:"http://i.imgur.com/Qr71crq.jpg"}}),t._v(" "),r("button",{staticClass:"btn btn-sm btn-primary",attrs:{disabled:t.disabled}},[t._v("\n        Post Comment\n      ")])])]),t._v(" "),t._l(t.comments,(function(e,i){return r("div",{key:e.id,staticClass:"card"},[r("div",{staticClass:"card-block"},[r("p",{staticClass:"card-text"},[t._v(t._s(e.body))])]),t._v(" "),r("div",{staticClass:"card-footer"},[r("nuxt-link",{staticClass:"comment-author",attrs:{to:{name:"profile",params:{username:e.author.username}}}},[r("img",{staticClass:"comment-author-img",attrs:{src:e.author.image}})]),t._v("\n       \n      "),r("nuxt-link",{staticClass:"comment-author",attrs:{to:{name:"profile",params:{username:e.author.username}}}},[t._v("\n        "+t._s(e.author.username)+"\n      ")]),t._v(" "),r("span",{staticClass:"date-posted"},[t._v(t._s(t._f("date")(e.createdAt,"MMM DD, YYYY")))]),t._v(" "),t.user&&t.user.username==e.author.username?r("span",{staticClass:"mod-options"},[r("i",{staticClass:"ion-trash-a",on:{click:function(r){return t.delComment(e.id,i)}}})]):t._e()],1)])}))],2)}),[],!1,null,null,null).exports},head:function(){return{title:"".concat(this.article.title," - RealWorld"),meta:[{hid:"description",name:"description",content:this.article.description}]}}},y=Object(O.a)(C,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"article-page"},[r("div",{staticClass:"banner"},[r("div",{staticClass:"container"},[r("h1",[t._v(t._s(t.article.title))]),t._v(" "),r("article-meta",{attrs:{article:t.article}})],1)]),t._v(" "),r("div",{staticClass:"container page"},[r("div",{staticClass:"row article-content"},[r("div",{staticClass:"col-md-12",domProps:{innerHTML:t._s(t.article.body)}}),t._v(" "),r("ul",{staticClass:"tag-list"},t._l(t.article.tagList,(function(e){return r("li",{key:e,staticClass:"tag-default tag-pill tag-outline"},[t._v("\n          "+t._s(e)+"\n        ")])})),0)]),t._v(" "),r("hr"),t._v(" "),r("div",{staticClass:"article-actions"},[r("article-meta",{attrs:{article:t.article}})],1),t._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col-xs-12 col-md-8 offset-md-2"},[r("article-comments",{attrs:{article:t.article}})],1)])])])}),[],!1,null,null,null);e.default=y.exports}}]);
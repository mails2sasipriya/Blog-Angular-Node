angular.module('myApp.controllers', ['myApp.services']).controller('ListBlogController', function (BlogFactory) {
    // refer: http://www.sitepoint.com/creating-crud-app-minutes-angulars-resource/
    var lbc = this;

    // .query() to get all teh entris
    lbc.blogs =  BlogFactory.query();
    console.log(lbc.blogs);

    // deletes the blog with $resource remove
    lbc.remove = function(blog){
        BlogFactory.remove({id : blog._id}, function(){
            lbc.blogs.splice(lbc.blogs.indexOf(blog),1);
        });
    }

}).controller('DetailsBlogController', function(BlogFactory, $routeParams){

    var dbc = this;
    // .get is for one entry
    BlogFactory.get({ id: $routeParams.id },function (data){
        dbc.currentBlog = data;
        dbc.blog_editable = false;
        dbc.message = '';
    });



    dbc.editBlog = function() {
        dbc.blog_editable = true;
    }

    dbc.updateBlog = function() {
        BlogFactory.update(dbc.currentBlog, function(data) {
            console.log(data);
            dbc.blog_editable = false;
            dbc.message = 'Updated blog successfully';
        });
    }

}).controller('CreateBlogController', function(BlogFactory){

    // to create we use .save()
    var cbc = this;
    cbc.blog = {};
    cbc.createNew = function() {
        cbc.message = '';
        BlogFactory.save(cbc.blog, function (data) {
            cbc.blog = data;
            console.log(data);
            cbc.message = 'Successfully created message!';

            //cbc.blog_editable = false;
        });
    };

});


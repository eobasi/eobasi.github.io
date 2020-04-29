// http://aboutcode.net/2010/11/11/list-github-projects-using-javascript.html

jQuery.githubUser = function(username, callback) {
    jQuery.getJSON("https://api.github.com/users/" + username + "/repos?callback=?", callback);
}

jQuery.fn.loadRepositories = function(username) {
    this.html("<span>Querying GitHub for " + username + "'s repositories...</span>");

    var target = this;
    $.githubUser(username, function(response) {
        var repos = response.data;
        //sortByNumberOfWatchers(repos);

        var list = $('<dl/>');
        target.empty().append(list);

        var display_delay = 0;

        $(repos).each(function() {
            if (this.name != username + '.github.io') {
                var parts = this.full_name.split('/');
                var url = this.has_pages ? 'http://io.eobasi.com/' + parts[1] : this.html_url;
                var description = this.description == null ? '' : this.description;
                var name = this.name == null ? '' : this.name;

                var project = $('<article class="post" id="project-' + this.id + '" style="display:none;"></article>')
                list.append(project);


                project.append('<h2><a href="' + url + '/">' + name + '</a></h2>');
                project.append('<p>' + description + '</p>');
                project.fadeIn(display_delay);
                display_delay = display_delay + 100;
            }

        });
    });

    function sortByNumberOfWatchers(repos) {
        repos.sort(function(a, b) {
            return b.watchers - a.watchers;
        });
    }
};
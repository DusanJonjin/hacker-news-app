This is the famous Y combinator's **Hacker news** web site partial clone.
It's made with React JS using their official Api.
- App has a total of 4 views (pages), 3 main pages and a nested one;
- Main pages are: **Top stories** which is a home page and it displays a list of top stories, **New stories** (list of new stories), and **All comments** which displays a list of comments for every story published on website, sorted by time;
- Top or New stories page list counts 20 stories, and you can use custom made pagination displayed on the bottom of the screen to move through stories back and forth (there are about 500 stories total sent from the server);
- Every story's title on Top or New stories page contains a link to a webpage where the story or article was published, and it will open in a new page if you click on it;
- You can view comments for every story individually (from Top or New stories page) by clicking on a link which is contained in story's box, and they will be displayed in this aforementioned nested page;
- All story's comments with their replies are shown by default, but you can collapse (and of course later extend) them individually by clicking on collapse ('-') sign. When comment is collapsed it also collapses all of it's replying comments, and the number is shown to inform us of a total count of these comments (and replies) below.
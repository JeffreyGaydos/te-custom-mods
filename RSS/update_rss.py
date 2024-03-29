import sys
import datetime
import requests
import re

_date = "{{date}}"
_url = "{{url}}"
_title ="{{title}}"

print("Updating RSS feeds...")

#get data
requestsResponse = requests.get("https://tanks-encyclopedia.com/", headers={'user-agent': 'Mozilla/5.0 (X11; U; Linux i686) Gecko/20071127 Firefox/2.0.0.11'})
rawContent = requestsResponse.content
recentPostsRGX = "(?<=<nav aria-label=\"Recent Posts\">).+(?=</nav>)"
recentPostsHTML = re.search(recentPostsRGX, (str)(rawContent)).group(0)
mostRecentPost = recentPostsHTML.split("</a>")[0]
mostRecentPostTitle = mostRecentPost.split('">')[1]
mostRecentPostLink = mostRecentPost.split('">')[0].split('<a href="')[1]
mostRecentPostTitle = mostRecentPostTitle.encode('latin1').decode('unicode-escape').encode('latin1').decode('utf-8')

print("Article Title: "  + mostRecentPostTitle)
print("Article Link: " + mostRecentPostLink)

guidRGX = '(?<=<guid>).+(?=</guid>)'
rssR = open("./RSS/recent-articles.rss", "r")
if(re.search(guidRGX, rssR.read()).group(0) == mostRecentPostLink):
    print("No new article found. Skipping...")
else:
    dateString = (str)(datetime.datetime.now())
    print("RSS Update Date: " + dateString[:10])

    #update RSS file
    urlString = mostRecentPostLink
    print(urlString)
    titleString = mostRecentPostTitle
    print(titleString)

    base = open("./RSS/recent-articles.base.rss").read()

    # base = base.replace(_date, dateString[:10])
    base = base.replace(_date, dateString)
    base = base.replace(_url, urlString)
    base = base.replace(_title, titleString)

    print(base)

    rss = open("./RSS/recent-articles.rss", "w", -1, "utf-8")
    rss.write(base)
    rss.close()

print("Finished updating RSS feeds...")
import sys
import datetime

_date = "{{date}}"
_url = "{{url}}"
_title ="{{title}}"

print("Updating RSS feeds...")

base = open("./RSS/recent-articles.base.rss").read()

dateString = (str)(datetime.datetime.now())
print(dateString[:10])

regexOutput = sys.stdin.read()
print("Input from Regex: " + regexOutput)

urlString = regexOutput.split('">')[0]
print(urlString)
titleString = regexOutput.split('">')[1]
print(titleString)

# base = base.replace(_date, dateString[:10])
base = base.replace(_date, dateString)
base = base.replace(_url, urlString)
base = base.replace(_title, titleString)

print(base)

rss = open("./RSS/recent-articles.rss", "w")
rss.write(base)

print("Finished updating RSS feeds...")
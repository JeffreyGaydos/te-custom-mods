printPrefix = "[build_localhost_path_cleanup.py]: "

#pretty much just find and replace all references to localhost with nothing
#log where we do this I guess (once we get github actions setup, these changes will be
# commited on a release branch, so there will be no need to undo. The dev branch (main)
# stays exactly as it is, except for the version ticks)

#ok so this is different from the others. With the others, we can run those on "master"
#before creating the release branch. But this should only be run on the release branch
#so we can continue to use localhost references during development

import os

for file in os.listdir("../js"):
    if(file.__contains__(".")):
        filer = open("../js/" + file, "r")
        filer = filer.read()
        if(filer.__contains__("localhost:8080")):
            print(printPrefix + "Found locahost ref in " + file + ". Removing...")
            newFile = filer.replace("localhost:8080", "")
            filew = open(file, "w")
            #filew.write(newFile)
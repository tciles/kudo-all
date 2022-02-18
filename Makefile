.PHONY: prepare
prepare:
	mkdir -p output build
	rm -rf output/*
	cp -r src/* output/

chrome:
	sed -i '' 's/"manifest_version": 2/"manifest_version": 3/g' output/manifest.json

.PHONY: zip
zip:
	cd output && zip -rv kudoall.zip .
	zip -T output/kudoall.zip

build.chrome: prepare chrome zip
	cp output/kudoall.zip build/kudoall-chrome.zip

build.firefox: prepare zip
	cp output/kudoall.zip build/kudoall-firefox.zip

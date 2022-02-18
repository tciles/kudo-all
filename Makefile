.PHONY: prepare
prepare:
	mkdir -p build/{temp,artefacts}
	rm -rf build/temp/*
	cp -r src/* build/temp

chrome:
	sed -i '' 's/"manifest_version": 2/"manifest_version": 3/g' build/temp/manifest.json

.PHONY: zip
zip:
	cd build/temp && zip -rv kudoall.zip .
	zip -T build/temp/kudoall.zip

build.chrome: prepare chrome zip
	cp build/temp/kudoall.zip build/artefacts/kudoall-chrome.zip

build.firefox: prepare zip
	cp build/temp/kudoall.zip build/artefacts/kudoall-firefox.zip

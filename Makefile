.PHONY: prepare
prepare:
	rm -rf output build
	mkdir output build
	cp -r src/* output/

.PHONY: zip
zip:
	cd output && zip -rv kudoall.zip .
	zip -T output/kudoall.zip
	mv output/kudoall.zip build/kudoall.zip

chrome:
	sed -i '' 's/__VERSION__/3/g' output/manifest.json

firefox:
	sed -i '' 's/__VERSION__/2/g' output/manifest.json

build.chrome: prepare chrome zip

build.firefox: prepare firefox zip

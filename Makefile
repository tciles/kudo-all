clean:
	rm -rf output build

prepare.dirs:
	mkdir output build
	cp -r src/* output/

zip:
	cd output && zip -rv kudoall.zip .
	zip -T output/kudoall.zip
	mv output/kudoall.zip build/kudoall.zip

build: clean prepare.dirs zip

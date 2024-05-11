#! /bin/bash

INKSCAPE="/usr/bin/inkscape"

SRC_FILE="assets.svg"
ASSET_INDEX="assets.txt"
FOLDERS_INDEX="folders.txt"


# Removing folders
rm -r dark
rm -r light
rm -r selected

# Making folders
for i in `cat $FOLDERS_INDEX`
do 
    mkdir -p $i
    echo $i
done

render() {
    VARIANT=$1
    FILENAME=$2

    case $FILENAME in
        *"radio"*)
            COMPONENT="radio"
            ;;
        *"checkbox"*)
            COMPONENT="checkbox"
            ;;
        *"switch"*)
            COMPONENT="switch"
            ;;
        *"titlebutton"*)
            COMPONENT="titlebutton"
            ;;
    esac

    echo
    echo Rendering "$VARIANT/$COMPONENT/$FILENAME.svg"
    $INKSCAPE --export-id=$i \
            --export-id-only \
            --export-type=svg \
            --export-filename=$VARIANT/$COMPONENT/$FILENAME.svg $SRC_FILE >/dev/null
}

for i in `cat $ASSET_INDEX`
do 
    case $i in
        *"dark")
            render "dark" ${i%"-dark"}
            ;;
        *"selected")
            render "selected" ${i%"-selected"}
            ;;
        *)
            render "light" "$i"
            ;;
    esac
done
exit 0

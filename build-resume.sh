#!/bin/bash

cd ./resume
RESUME_TEX="resume.tex"

if [ ! -f "$RESUME_TEX" ]; then
    echo "The resume.tex file does not exist."
    exit 1
fi

if ! [ -x "$(command -v pdflatex)" ]; then
    echo "Error: pdflatex is not installed." >&2
    exit 1
fi

pdflatex "$RESUME_TEX"
cp resume.pdf ../public

if [ $? -eq 0 ]; then
    # if cowsay is installed, display a message using cowsay
    if [ -x "$(command -v cowsay)" ]; then
        cowsay "Resume built successfully."
    else
        echo "Resume built successfully."
    fi
else
    echo "Failed to build the resume."
fi

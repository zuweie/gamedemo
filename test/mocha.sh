#!/bin/bash
pwd=`pwd`
mocha=$pwd/../node_modules/mocha/bin/mocha
echo $mocha
$mocha $1 || .

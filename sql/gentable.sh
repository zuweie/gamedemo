#!/bin/bash
user=root
host=localhost
database=gameserver
mysql -u$user -h$host $database < $1
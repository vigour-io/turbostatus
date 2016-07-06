#!/bin/bash

export TURBOSTATUS_FOLDER=$0:h

function turbostatus {
  . $TURBOSTATUS_FOLDER/turbostatus
}

alias ts='turbostatus'

#!/bin/bash

# Function to extract version from package.json
get_version_from_package_json() {
  version=$(jq -r '.version' package.json)
  echo $version
}

# Function to get the latest git tag
get_latest_git_tag() {
  tag=$(git describe --tags --abbrev=0)
  if [ $? -ne 0 ]; then
    echo "No git tags found."
    exit 1
  fi
  echo $tag
}

# Function to strip the leading 'v' from the tag if it exists
strip_leading_v() {
  local tag=$1
  echo "${tag#v}"
}

# Main script
main() {
  if ! [ -f "package.json" ]; then
    echo "package.json not found."
    exit 1
  fi

  version=$(get_version_from_package_json)
  echo "Current package.json version: $version"

  tag=$(get_latest_git_tag)
  echo "Latest git tag: $tag"

  stripped_tag=$(strip_leading_v "$tag")
  echo "Stripped tag: $stripped_tag"

  # Update package.json version with the stripped tag
  jq --arg tag "$stripped_tag" '.version = $tag' package.json > temp.json && mv temp.json package.json

  echo "Updated package.json version to: $stripped_tag"
}

# Execute the main script
main

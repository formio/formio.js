# Shim for legacy `nix-shell` support.
(import
  (
    fetchTarball {
      # Using this pr-1 so that subflakes are supported (ie. referencing a flake via a relative path)
      url = "https://github.com/BBBSnowball/flake-compat/archive/pr-1.tar.gz";
      sha256 = "195gqcw5zaxi9rcngylzwhjdafk9pb7db8l2a2nyhdac7dsvxpv9";
    }
  )
  { src = ./.; }).shellNix

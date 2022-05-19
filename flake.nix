{
  inputs.nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
  inputs.flake-utils.url = "github:numtide/flake-utils";
  outputs = { self, nixpkgs, flake-utils }: flake-utils.lib.eachDefaultSystem (system:
    let pkgs = nixpkgs.legacyPackages.${system}; in
    {
      devShell = pkgs.mkShell {
        buildInputs = with pkgs; [ nodejs-14_x nodePackages.gulp ];
        shellHook = ''
          export PATH="$PWD/node_modules/.bin/:$PATH"
        '';
      };
    });
}

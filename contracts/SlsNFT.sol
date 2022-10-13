// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SlsNFT is ERC1155, Ownable {
    uint256 public constant ARTWORK = 0;
    uint256 public constant PHOTO = 1;

    constructor() ERC1155("") {
        _mint(msg.sender, ARTWORK, 1, "");
        _mint(msg.sender, PHOTO, 1, "");
    }

    function mint(
        address to,
        uint256 tokenId,
        uint256 amount
    ) external onlyOwner {
        _mint(to, tokenId, amount, "");
    }

    function burn(
        address from,
        uint256 id,
        uint256 amount
    ) public onlyOwner {
        _burn(from, id, amount);
    }
}

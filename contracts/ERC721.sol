// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IERC721.sol";
import "./interfaces/IERC721Receiver.sol";

contract ERC721 is IERC721, IERC721Receiver {
    /*
    implemented in interface

    event Transfer(address indexed _from,address indexed _to,uint256 indexed _tokenId);
    event Approval(address indexed _owner,address indexed _approved,uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner,address indexed _operator, bool approved);
    */

    mapping(address => uint256) internal _balanceOf;
    mapping(uint256 => address) internal _ownerOf;
    mapping(uint256 => address) internal _approvals;
    mapping(address => mapping(address => bool)) public isApprovedForAll;

    constructor() {}

    function supportsInterface(bytes4 interfaceId)
        external
        pure
        returns (bool)
    {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC165).interfaceId;
    }

    function ownerOf(uint256 tokenId) external view returns (address owner) {
        owner = _ownerOf[tokenId];
        require(owner != address(0), "token doensn't exist");
    }

    function balanceOf(address owner) external view returns (uint256) {
        require(owner != address(0), "owner is zeroth address");
        return _balanceOf[owner];
    }

    function approve(address spender, uint256 tokenId) external {
        address owner = _ownerOf[tokenId];

        require(
            owner == msg.sender || isApprovedForAll[owner][msg.sender] == true,
            "unauthorized"
        );

        _approvals[tokenId] = spender;

        emit Approval(msg.sender, spender, tokenId);
    }

    function setApprovalForAll(address operator, bool approved) external {
        isApprovedForAll[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function getApproved(uint256 tokenId) external view returns (address) {
        require(_ownerOf[tokenId] != address(0), "token doens't exist");
        return _approvals[tokenId];
    }

    function _isApprovedOrOwner(
        address owner,
        address spender,
        uint256 tokenId
    ) internal view returns (bool) {
        return (spender == owner ||
            isApprovedForAll[owner][spender] == true ||
            _approvals[tokenId] == spender);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external {
        transferFrom(from, to, tokenId);
        require(
            to.code.length == 0 ||
                IERC721Receiver(to).onERC721Received(
                    msg.sender,
                    from,
                    tokenId,
                    data
                ) ==
                IERC721Receiver.onERC721Received.selector,
            "unsafe recipient"
        );
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external {
        transferFrom(from, to, tokenId);
        require(
            to.code.length == 0 ||
                IERC721Receiver(to).onERC721Received(
                    msg.sender,
                    from,
                    tokenId,
                    ""
                ) ==
                IERC721Receiver.onERC721Received.selector,
            "unsafe recipient"
        );
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public {
        require(from == _ownerOf[tokenId], "from is not the token owner");
        require(to != address(0), "transfering to burn address");
        require(
            _isApprovedOrOwner(from, msg.sender, tokenId),
            "not authorized to spend NFT"
        );

        _balanceOf[from]--;
        _balanceOf[to]++;
        _ownerOf[tokenId] = to;

        delete _approvals[tokenId];

        emit Transfer(from, to, tokenId);
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4) {}

    function mint() external {}
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IERC1155.sol";

contract ERC1155 is IERC1155 {
    //mapping from tokenId to accounts balances
    mapping(uint256 => mapping(address => uint256)) private _balances;
    //mapping from account to operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    string private _uri;

    function balanceOf(address owner, uint256 id)
        public
        view
        returns (uint256)
    {
        require(owner != address(0), "owner = zero address");
        return _balances[id][owner];
    }

    function balanceOfBatch(address[] calldata owners, uint256[] calldata ids)
        external
        view
        returns (uint256[] memory)
    {
        require(
            owners.length == ids.length,
            "ERC1155: accounts and ids length mismatch"
        );
        uint256[] memory batchBalances = new uint256[](owners.length);

        for (uint256 i = 0; i < owners.length; i++) {
            batchBalances[i] = balanceOf(owners[i], ids[i]);
        }

        return batchBalances;
    }

    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return _operatorApprovals[owner][operator];
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 value,
        bytes memory data
    ) public {
        require(
            msg.sender == from || isApprovedForAll(from, msg.sender),
            "Unauthorized"
        );
        _safeTransferFrom(from, to, id, value, data);
    }

    function _safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) internal {
        require(to != address(0), "ERC1155: sending to zeroth address");
        address operator = msg.sender;

        /*
        used in the _beforeTokenTrasfer hook
        
        uint256[] memory ids = _asSingletonArray(id);
        uint256[] memory amounts = _asSingletonArray(amount);
        */

        uint256 fromBalance = _balances[id][from];
        require(
            fromBalance >= amount,
            "ERC1155: insufficient balance for transfer"
        );
        _balances[id][from] = fromBalance - amount;
        _balances[id][to] += amount;

        emit TransferSingle(operator, from, to, id, amount);
    }

    function _safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal {
        require(to != address(0), "ERC1155: sending to zeroth address");
        address operator = msg.sender;

        for (uint256 i = 0; i < ids.length; i++) {
            uint256 id = ids[i];
            uint256 amount = amounts[i];

            uint256 fromBalance = _balances[id][from];
            require(fromBalance >= amount, "ERC1155: insufficient balance");
            _balances[id][from] = fromBalance - amount;
            _balances[id][to] += amount;
        }

        emit TransferBatch(operator, from, to, ids, amounts);
    }

    /*
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external {
        moved to internal transfer function
        require(to != address(0), "ERC1155: sending to zeroth address");

        moved to isApprovedForAll function
        require(_operatorApprovals[from][msg.sender] == true);

        moved to internal transfer function
        require(_balances[id][from] >= amount);
    }
    */

    function _asSingletonArray(uint256 element)
        private
        pure
        returns (uint256[] memory)
    {
        uint256[] memory array = new uint256[](1);
        array[0] = element;

        return array;
    }
}

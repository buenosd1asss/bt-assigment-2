 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AIModelMarketplace {
    struct Model {
        string name;
        string description;
        uint256 price;
        address payable creator;
        uint256 ratingCount;
        uint256 ratingSum;
    }

    uint256 public modelIdCounter;
    mapping(uint256 => Model) public models;
    mapping(uint256 => mapping(address => bool)) public hasPurchased;

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    function listModel(
        string memory name,
        string memory description,
        uint256 price
    ) external {
        require(price > 0, "Price must be greater than zero");

        models[modelIdCounter] = Model(
            name,
            description,
            price,
            payable(msg.sender),
            0,
            0
        );
        modelIdCounter++;
    }

    function purchaseModel(uint256 modelId) external payable {
        Model storage model = models[modelId];
        require(msg.value == model.price, "Incorrect payment");
        require(msg.sender != model.creator, "Creator cannot purchase own model");
        require(!hasPurchased[modelId][msg.sender], "Already purchased");

        model.creator.transfer(msg.value);
        hasPurchased[modelId][msg.sender] = true;
    }

    function rateModel(uint256 modelId, uint8 rating) external {
        require(rating >= 1 && rating <= 5, "Invalid rating");
        require(hasPurchased[modelId][msg.sender], "Must purchase to rate");

        Model storage model = models[modelId];
        model.ratingCount++;
        model.ratingSum += rating;
    }

    function withdrawFunds() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    function getModelDetails(uint256 modelId)
    external
    view
    returns (
        string memory name,
        string memory description,
        uint256 price,
        address creator,
        uint256 averageRating
    )
{
    Model storage model = models[modelId];
    averageRating = model.ratingCount > 0
        ? model.ratingSum / model.ratingCount
        : 0;
    return (model.name, model.description, model.price, model.creator, averageRating);
}

}

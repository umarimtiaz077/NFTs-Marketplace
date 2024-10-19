// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol"; // Use your custom Pausable contract

contract NFTMarketplace is ERC721URIStorage, ReentrancyGuard, Pausable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;        // Counter for token IDs
    Counters.Counter private _collectionIds;   // Counter for collection IDs

    uint256 public listingPrice = 0.025 ether; // Default listing price
    address payable public owner;               // Owner of the contract
    uint256 public maxRoyalty = 15;            // Maximum royalty percentage allowed

    // Structure for Market Items (NFTs)
    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
        bool hidden;                       // To manage visibility
        uint256 creationTimestamp;
        address payable originalCreator;    // Original creator of the NFT
        uint256 creatorRoyalty;            // Royalty percentage defined by the creator
    }

    // Structure for Collections
    struct Collection {
        uint256 collectionId;
        address creator;
        string name;
        uint256[] tokenIds;               // Array of token IDs in the collection
    }

    // Structure for User Profiles
    struct UserProfile {
        address userAddress;
        string username;
        string profilePic;
        string bio;
        uint256[] createdNFTs;            // NFTs created by the user
    }

    mapping(uint256 => MarketItem) private idToMarketItem;       // Mapping from token ID to MarketItem
    mapping(uint256 => Collection) private idToCollection;       // Mapping from collection ID to Collection
    mapping(address => UserProfile) private userProfiles;        // Mapping from user address to UserProfile
    address[] private userAddresses;                              // Store all user addresses for fetching profiles

    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    event RoyaltyPaid(address indexed creator, uint256 amount);
    event CollectionCreated(uint256 indexed collectionId, string name, address indexed creator);
    event ProfileUpdated(address indexed user, string username, string bio);
    event NFTVisibilityChanged(uint256 indexed tokenId, bool hidden);
    event NFTTransferred(uint256 indexed tokenId, address from, address to); // Event for tracking transfers

    constructor() ERC721("Metaverse Tokens", "METT") {
        owner = payable(msg.sender); // Set contract deployer as owner
    }

    // Update listing price
    function updateListingPrice(uint256 _listingPrice) public {
        require(owner == msg.sender, "Only marketplace owner can update listing price.");
        listingPrice = _listingPrice;
    }

    // Get the listing price
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    // Pause the contract in case of emergency
function pause() public override {
    require(owner == msg.sender, "Only marketplace owner can pause the contract.");
    super.pause();  // Call the pause function from the Pausable contract
}

    // Unpause the contract
function unpause() public override {
    require(owner == msg.sender, "Only marketplace owner can unpause the contract.");
    super.unpause(); // Call the unpause function from the Pausable contract
}

    // Mint a token and list it in the marketplace, with user-defined royalty
    function createToken(string memory tokenURI, uint256 price, uint256 royalty)
        public
        payable
        nonReentrant
        whenNotPaused
        returns (uint256)
    {
        require(price > 0, "Price must be at least 1 wei");
        require(msg.value == listingPrice, "Price must be equal to listing price");
        require(royalty <= maxRoyalty, "Royalty cannot exceed 15%");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        createMarketItem(newTokenId, price, royalty);

        // Add the new NFT to the user's profile
        userProfiles[msg.sender].createdNFTs.push(newTokenId);

        return newTokenId;
    }

    // Creates a market item with royalty
    function createMarketItem(uint256 tokenId, uint256 price, uint256 royalty) private {
        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false,
            false,  // NFT is visible by default
            block.timestamp,
            payable(msg.sender),  // Set original creator
            royalty  // Set creator-defined royalty
        );

        _transfer(msg.sender, address(this), tokenId);
        emit MarketItemCreated(tokenId, msg.sender, address(this), price, false);
    }

    // Create a new collection
    function createCollection(string memory name) public whenNotPaused returns (uint256) {
        _collectionIds.increment();
        uint256 newCollectionId = _collectionIds.current();
        idToCollection[newCollectionId] = Collection(newCollectionId, msg.sender, name, new uint256[](0));
        
        emit CollectionCreated(newCollectionId, name, msg.sender);
        return newCollectionId;
    }

    // Add an NFT to a collection
    function addTokenToCollection(uint256 collectionId, uint256 tokenId) public whenNotPaused {
        require(idToMarketItem[tokenId].owner == msg.sender, "Only the owner can add tokens to the collection");
        idToCollection[collectionId].tokenIds.push(tokenId);
    }

    // Update the user's profile
    function updateProfile(string memory username, string memory profilePic, string memory bio) public {
        userProfiles[msg.sender] = UserProfile(msg.sender, username, profilePic, bio, userProfiles[msg.sender].createdNFTs);
        if (!addressExists(msg.sender)) {
            userAddresses.push(msg.sender); // Add user address to the list
        }
        emit ProfileUpdated(msg.sender, username, bio);
    }

    // Helper function to check if address exists
    function addressExists(address user) private view returns (bool) {
        for (uint256 i = 0; i < userAddresses.length; i++) {
            if (userAddresses[i] == user) {
                return true;
            }
        }
        return false;
    }

    // Fetch the user's profile
    function fetchProfile(address user) public view returns (UserProfile memory) {
        return userProfiles[user];
    }

    // Hide an NFT from the marketplace
    function hideNFT(uint256 tokenId) public whenNotPaused {
        require(idToMarketItem[tokenId].owner == msg.sender, "Only the owner can hide the token");
        idToMarketItem[tokenId].hidden = true;
        emit NFTVisibilityChanged(tokenId, true);
    }

    // Unhide an NFT to make it visible again
    function unhideNFT(uint256 tokenId) public whenNotPaused {
        require(idToMarketItem[tokenId].owner == msg.sender, "Only the owner can unhide the token");
        idToMarketItem[tokenId].hidden = false;
        emit NFTVisibilityChanged(tokenId, false);
    }

    // Fetch all NFTs in a user's collection
    function fetchUserCollections(address user) public view returns (Collection[] memory) {
        uint256 totalCollectionCount = _collectionIds.current();
        uint256 collectionCount = 0;
        Collection[] memory collections = new Collection[](totalCollectionCount);

        for (uint256 i = 1; i <= totalCollectionCount; i++) {
            if (idToCollection[i].creator == user) {
                collections[collectionCount] = idToCollection[i];
                collectionCount++;
            }
        }

        // Resize the array to the actual count of collections
        assembly { mstore(collections, collectionCount) }
        return collections;
    }

    // Fetches all NFTs in a collection
    function fetchCollectionNFTs(uint256 collectionId) public view returns (MarketItem[] memory) {
        uint256 totalItemCount = idToCollection[collectionId].tokenIds.length;
        MarketItem[] memory items = new MarketItem[](totalItemCount);

        for (uint256 i = 0; i < totalItemCount; i++) {
            uint256 tokenId = idToCollection[collectionId].tokenIds[i];
            items[i] = idToMarketItem[tokenId];
        }

        return items;
    }

    // Fetch all user profiles
    function fetchAllUserProfiles() public view returns (UserProfile[] memory) {
        uint256 totalUserCount = userAddresses.length;
        UserProfile[] memory profiles = new UserProfile[](totalUserCount);

        for (uint256 i = 0; i < totalUserCount; i++) {
            profiles[i] = userProfiles[userAddresses[i]];
        }

        return profiles;
    }

    // Market Sale Logic
    function createMarketSale(uint256 tokenId) public payable nonReentrant whenNotPaused {
        MarketItem storage item = idToMarketItem[tokenId];
        address payable seller = item.seller;

        require(msg.value == item.price, "Please submit the asking price in order to complete the purchase");
        require(!item.sold, "This NFT has already been sold");

        item.sold = true;
        item.owner = payable(msg.sender);

        // Transfer the funds to the seller
        seller.transfer(msg.value - (msg.value * item.creatorRoyalty / 100));
        
        // Transfer royalty to the original creator
        item.originalCreator.transfer(msg.value * item.creatorRoyalty / 100);
        
        // Transfer NFT ownership
        _transfer(address(this), msg.sender, tokenId);
        
        emit NFTTransferred(tokenId, seller, msg.sender);
    }

    // Fetch Market Items
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 currentIndex = 0;
        MarketItem[] memory items = new MarketItem[](totalItemCount);

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(this) && !idToMarketItem[i + 1].hidden) {
                uint256 currentId = idToMarketItem[i + 1].tokenId;
                items[currentIndex] = idToMarketItem[currentId];
                currentIndex++;
            }
        }

        // Resize the array to the actual count of items
        assembly { mstore(items, currentIndex) }
        return items;
    }
}

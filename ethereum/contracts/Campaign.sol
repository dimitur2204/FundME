pragma solidity ^0.8.0;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint256 minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address payable recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    address payable public manager;
    uint256 public minimumContribution;
    mapping(address => bool) public approvers;
    uint256 public approversCount;

    uint256 numCampaigns;
    mapping(uint256 => Request) public requests;

    constructor(uint256 minimum, address creator) {
        manager = payable(creator);
        minimumContribution = minimum;
    }

    function createRequest(
        string memory description,
        uint256 value,
        address payable recipient
    ) public payable restricted returns (uint256 campaignId) {
        campaignId = numCampaigns++;
        Request storage request = requests[campaignId];
        request.description = description;
        request.value = value;
        request.recipient = recipient;
    }

    function approveRequest(uint256 campaignId) public {
        Request storage requestToApprove = requests[campaignId];
        //Check if is donator
        require(approvers[msg.sender]);
        //Check if has already voted
        require(!requestToApprove.approvals[msg.sender]);

        requestToApprove.approvals[msg.sender] = true;
        requestToApprove.approvalCount++;
    }

    function finalizeRequest(uint256 campaignId) public {
        Request storage requestToFinalize = requests[campaignId];
        require(!requestToFinalize.complete);
        require(requestToFinalize.approvalCount > (approversCount / 2));
        requestToFinalize.complete = true;
        requestToFinalize.recipient.transfer(requestToFinalize.value);
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    modifier restricted {
        require(payable(msg.sender) == manager);
        _;
    }
}

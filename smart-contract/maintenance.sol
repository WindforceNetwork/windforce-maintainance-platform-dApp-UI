pragma solidity ^0.4.0;

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
  address public owner;

  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  constructor () public {
    owner = msg.sender;
  }


  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }


  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
  function transferOwnership(address newOwner) public onlyOwner {
    require(newOwner != address(0));
    emit OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }

}

contract Maintainance is Ownable{
    address public editor;

    struct Template {
        string description;
        uint rate;
        bool recurring;
        bool perUnitRate;
        string recurringBy;
    }
    struct ContractCore {
        string status;
        uint id;
        uint rate;
        uint unit;
        address owner;
        address client;
    }
    struct contractDetail{
        uint id;
        uint recurrenceNo;
        string provider;
        string description;
        string name;
        string date;
    }
    uint templateIdCounter;
    uint contractIdCounter;
    mapping(uint=>address) templateToAddress;
    mapping(uint=>address) contractToAddress;
    mapping(uint=>Template) idToTemplate;
    mapping(uint=>ContractCore) idToContractCore;
    mapping(uint=>contractDetail) idToContractDetail;
    mapping(address=>Template[]) addressToTemplateArray;
    mapping(address=>ContractCore[]) addressToContractCoreArray;
    mapping(address=>contractDetail[]) addressToContractDetailArray;
    ContractCore [] public allContracts;
    Template [] public allTemplates;

    event NewTemplate(
        string description,
        uint rate,
        bool recurring,
        bool perUnitRate,
        string recurringBy
    );
    event newContract(
        string status,
        uint id,
        uint rate,
        uint unit,
        address owner,
        address client
    );
    event UpdateTemplate(
        string description,
        uint rate,
        bool recurring,
        bool perUnitRate,
        string recurringBy
    );
    event UpdateContractCore(
        string status,
        uint id,
        uint rate,
        uint unit,
        address owner,
        address client
    );
    event updateContractDetail(
        uint id,
        uint recurrenceNo,
        string provider,
        string description,
        string name,
        string date
    );

    event contractAccepted(
        uint id,
        address owner,
        address client
    );

    modifier ownerOfContract(uint id){
        require(contractToAddress[id]==msg.sender);
        _;
    }
    modifier ownerOfTemplate(uint id){
        require(templateToAddress[id]==msg.sender);
        _;
    }
    modifier isEditor(){
        require(msg.sender == editor);
        _;
    }

    constructor()public {
        editor = msg.sender;
        templateIdCounter = 0;
        contractIdCounter = 0;
    }

    function createTemplate(
        string description,
        uint rate,
        bool recurring,
        bool perUnitRate,
        string recurringBy) public{
        //TODO: check for duplicates
        // Template memory template = Template(description, rate, recurring, perUnitRate, recurringBy);
        templateToAddress[templateIdCounter] = msg.sender;
        idToTemplate[templateIdCounter].description = description;
        idToTemplate[templateIdCounter].rate = rate;
        idToTemplate[templateIdCounter].recurring = recurring;
        idToTemplate[templateIdCounter].perUnitRate = perUnitRate;
        idToTemplate[templateIdCounter].recurringBy = recurringBy;
        templateIdCounter++;
        if(addressToTemplateArray[msg.sender].length != 0){
            uint256 idx = addressToTemplateArray[msg.sender].length;
            addressToTemplateArray[msg.sender][idx].description = description;
            addressToTemplateArray[msg.sender][idx].rate = rate;
            addressToTemplateArray[msg.sender][idx].recurring = recurring;
            addressToTemplateArray[msg.sender][idx].perUnitRate = perUnitRate;
            addressToTemplateArray[msg.sender][idx].recurringBy = recurringBy;
        }else{
            addressToTemplateArray[msg.sender][0].description = description;
            addressToTemplateArray[msg.sender][0].rate = rate;
            addressToTemplateArray[msg.sender][0].recurring = recurring;
            addressToTemplateArray[msg.sender][0].perUnitRate = perUnitRate;
            addressToTemplateArray[msg.sender][0].recurringBy = recurringBy;
            // Template[] memory templates = new Template[](1);
            // templates[0] = template;
            // addressToTemplateArray[msg.sender] = templates;
        }
    }

    function createContract(
        uint rate,
        uint unit,
        address owner
        ) public {
        // ContractCore memory tempContract = ContractCore("pending", contractIdCounter, rate, unit, owner, client);
        contractToAddress[contractIdCounter] = msg.sender;
        idToContractCore[contractIdCounter].status = "pending";
        idToContractCore[contractIdCounter].id = contractIdCounter;
        idToContractCore[contractIdCounter].rate = rate;
        idToContractCore[contractIdCounter].unit = unit;
        idToContractCore[contractIdCounter].owner = owner;
        contractIdCounter++;
        if(addressToContractCoreArray[msg.sender].length != 0){
            uint256 idx = addressToContractCoreArray[msg.sender].length;
            // addressToContractCoreArray[msg.sender][idx].
            addressToContractCoreArray[msg.sender][idx].status = "pending";
            addressToContractCoreArray[msg.sender][idx].id = contractIdCounter;
            addressToContractCoreArray[msg.sender][idx].rate = rate;
            addressToContractCoreArray[msg.sender][idx].unit = unit;
            addressToContractCoreArray[msg.sender][idx].owner = owner;
        }else{
            // ContractCore[] memory contracts = new ContractCore[](1);
            addressToContractCoreArray[msg.sender][0].status = "pending";
            addressToContractCoreArray[msg.sender][0].id = contractIdCounter;
            addressToContractCoreArray[msg.sender][0].rate = rate;
            addressToContractCoreArray[msg.sender][0].unit = unit;
            addressToContractCoreArray[msg.sender][0].owner = owner;
            // uint256 idx = addressToContractCoreArray[msg.sender].length + 1;
            // addressToContractCoreArray[msg.sender][0]
        }
    }

    function acceptContract(uint id) public payable ownerOfContract(id) returns(bool){
        require(bytes(idToContractCore[id].status).length!= 0);
        require(msg.value >= idToContractCore[id].rate);
        idToContractCore[id].status = "ongoing";
        idToContractCore[id].owner.transfer(msg.value);
        emit contractAccepted(id, msg.sender, idToContractCore[id].client);
        return true;
    }

    function getContract(uint id) public returns (bool) {
        require(bytes(idToContractCore[id].status).length != 0);

        emit newContract(
            idToContractCore[id].status,
            id,
            idToContractCore[id].rate,
            idToContractCore[id].unit,
            idToContractCore[id].owner,
            idToContractCore[id].client
            );

    }

    function getTemplate(uint id) public view returns(
        string description,
        uint rate,
        bool recurring,
        bool perUnitRate,
        string recurringBy
        ){
        require(bytes(idToTemplate[id].description).length != 0);
        return(
            idToTemplate[id].description,
            idToTemplate[id].rate,
            idToTemplate[id].recurring,
            idToTemplate[id].perUnitRate,
            idToTemplate[id].recurringBy
            );

    }

    function updateContractProvider(uint id, string provider) public ownerOfContract(id) returns(bool) {
        idToContractDetail[id].provider = provider;
        emit updateContractDetail(
            id,
            idToContractDetail[id].recurrenceNo,
            provider,
            idToContractDetail[id].description,
            idToContractDetail[id].name,
            idToContractDetail[id].date
        );
        return true;
    }

    function updateContractDescription(uint id, string description) public ownerOfContract(id) returns(bool){
        idToContractDetail[id].description = description;
        emit updateContractDetail(
            id,
            idToContractDetail[id].recurrenceNo,
            idToContractDetail[id].provider,
            description,
            idToContractDetail[id].name,
            idToContractDetail[id].date
        );
        return true;
    }
    function updateContractName(uint id, string name) public ownerOfContract(id) returns(bool){
        idToContractDetail[id].name = name;
        emit updateContractDetail(
            id,
            idToContractDetail[id].recurrenceNo,
            idToContractDetail[id].provider,
            idToContractDetail[id].description,
            name,
            idToContractDetail[id].date
        );
        return true;
    }

    function updateContractDate(uint id, string date) public ownerOfContract(id) returns(bool){
        idToContractDetail[id].date = date;
        emit updateContractDetail(
             id,
             idToContractDetail[id].recurrenceNo,
            idToContractDetail[id].provider,
            idToContractDetail[id].description,
            idToContractDetail[id].name,
            date
        );
        return true;
    }

    function updateContractStatus(uint id, string status) public returns(bool){
        idToContractCore[id].status = status;
        emit UpdateContractCore(
            status,
            idToContractCore[id].id,
            idToContractCore[id].rate,
            idToContractCore[id].unit,
            idToContractCore[id].owner,
            idToContractCore[id].client
        );
        return true;

    }

    function updateContractRate(uint id, uint rate) public ownerOfContract(id) returns(bool){
        idToContractCore[id].rate = rate;
        emit UpdateContractCore(
            idToContractCore[id].status,
            idToContractCore[id].id,
            rate,
            idToContractCore[id].unit,
            idToContractCore[id].owner,
            idToContractCore[id].client
        );
        return true;
    }
    function updateContractRecurringNo(uint id, uint recurrenceNo) public ownerOfContract(id) returns(bool){
        idToContractDetail[id].recurrenceNo = recurrenceNo;
        emit updateContractDetail(
            idToContractDetail[id].id,
            recurrenceNo,
            idToContractDetail[id].provider,
            idToContractDetail[id].description,
            idToContractDetail[id].name,
            idToContractDetail[id].date
        );
        return true;
    }
    function updateContractUnit(uint id, uint unit) public ownerOfContract(id) returns(bool){
        idToContractCore[id].unit = unit;
        emit UpdateContractCore(
            idToContractCore[id].status,
            idToContractCore[id].id,
            idToContractCore[id].rate,
            unit,
            idToContractCore[id].owner,
            idToContractCore[id].client
        );
        return true;
    }
    function updateTemplateDescription(uint id, string description) public ownerOfTemplate(id) returns(bool){
        idToTemplate[id].description = description;
        emit UpdateTemplate(
            description,
            idToTemplate[id].rate,
            idToTemplate[id].recurring,
            idToTemplate[id].perUnitRate,
            idToTemplate[id].recurringBy
        );
    }
    function updateTemplateRate(uint id, uint rate) public ownerOfTemplate(id) returns(bool){
        idToTemplate[id].rate = rate;
        emit UpdateTemplate(
            idToTemplate[id].description,
            rate,
            idToTemplate[id].recurring,
            idToTemplate[id].perUnitRate,
            idToTemplate[id].recurringBy
        );
    }
    function updateTemplateRecurring(uint id, bool recurring) public ownerOfTemplate(id) returns(bool){
        idToTemplate[id].recurring = recurring;
        emit UpdateTemplate(
            idToTemplate[id].description,
            idToTemplate[id].rate,
            recurring,
            idToTemplate[id].perUnitRate,
            idToTemplate[id].recurringBy
        );
    }
    function updateTemplatePerUnitRate(uint id, bool perUnitRate) public ownerOfTemplate(id) returns(bool){
        idToTemplate[id].perUnitRate = perUnitRate;
        emit UpdateTemplate(
            idToTemplate[id].description,
            idToTemplate[id].rate,
            idToTemplate[id].recurring,
            perUnitRate,
            idToTemplate[id].recurringBy
        );
    }
    function updateTemplateRecurringBy(uint id, string recurringBy) public ownerOfTemplate(id) returns(bool){
        idToTemplate[id].recurringBy = recurringBy;
        emit UpdateTemplate(
            idToTemplate[id].description,
            idToTemplate[id].rate,
            idToTemplate[id].recurring,
            idToTemplate[id].perUnitRate,
            recurringBy
        );
    }
    function deleteTemplate(uint id) public ownerOfTemplate(id) returns (bool){
        delete idToTemplate[id];
        return true;
    }
    function deleteContract(uint id) public ownerOfContract(id) returns (bool){
        delete idToContractCore[id];
        return true;
    }

    function updateSecondaryContractMapping(ContractCore tempContract) internal {
        for(uint i = 0; i < addressToContractCoreArray[msg.sender].length; i ++){
            if(addressToContractCoreArray[msg.sender][i].id == tempContract.id){
                addressToContractCoreArray[msg.sender][i] = tempContract;
            }
        }
    }
    






}

contract Clearance is Maintainance{
    //TODO: schedule Clearance periodically
}

pragma solidity ^0.4.0;

contract accountContract{
    event newAccount ();
    address public editor;
    struct Account {
        string name;
        string company;
    }
    mapping(string=>address) usernameToAddress;
    mapping(string=>Account) usernameToAccount;

    modifier ownerOf(string username){
        require(usernameToAddress[username]==msg.sender);
        _;
    }
    modifier isEditor(){
        require(msg.sender == editor);
        _;
    }
    constructor()public {
        editor = msg.sender;
    }
    function registerUsername(string username) external returns (bool){
        require(usernameToAddress[username] == 0);
        usernameToAddress[username] = msg.sender;
        return true;
    }
    function register(string username, string name, string company) external returns (bool){
        require(bytes(usernameToAccount[username].name).length == 0);
        require(usernameToAddress[username] != 0);
        usernameToAddress[username] = msg.sender;
        Account memory acc = Account(name, company);
        usernameToAccount[username] = acc;
    }

    function updateUserInfo(string username, string name, string company) external ownerOf(username){
        Account memory acc = Account(name, company);
        usernameToAccount[username] = acc;
    }
    function editorChanges(string username, string name, string company) external isEditor {
        Account memory acc = Account(name, company);
        usernameToAccount[username] = acc;
    }
    
}

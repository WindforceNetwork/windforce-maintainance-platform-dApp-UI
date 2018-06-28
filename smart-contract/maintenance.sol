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
    struct Contract {
        string provider;
        string description;
        string name;
        string date;
        string status;
        uint id;
        uint rate;
        uint recurrenceNo;
        uint unit;
        address owner;
        address client;
    }
    uint templateIdCounter;
    uint contractIdCounter;
    mapping(uint=>address) templateToAddress;
    mapping(uint=>address) contractToAddress;
    mapping(uint=>Template) idToTemplate;
    mapping(uint=>Contract) idToContract;
    mapping(address=>Template[]) addressToTemplateArray;
    mapping(address=>Contract[]) addressToContractArray;
    Contract [] public allContracts;
    Template [] public allTemplates;
    
    event NewTemplate(
        string description,
        uint rate,
        bool recurring,
        bool perUnitRate,
        string recurringBy
    );
    event newContract(
        string provider,
        string description,
        string name,
        string date,
        string status,
        uint id,
        uint rate,
        uint recurrenceNo,
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
    event UpdateContract(
        string provider,
        string description,
        string name,
        string date,
        string status,
        uint id,
        uint rate,
        uint recurrenceNo,
        uint unit,
        address owner,
        address client
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
        Template memory template = Template(description, rate, recurring, perUnitRate, recurringBy);
        templateToAddress[templateIdCounter] = msg.sender;
        idToTemplate[templateIdCounter] = template;
        templateIdCounter++;
        if(addressToTemplateArray[msg.sender].length != 0){
            addressToTemplateArray[msg.sender].push(template);
        }else{
            Template[] memory templates = new Template[](1);
            templates[0] = template;
            addressToTemplateArray[msg.sender] = templates;
        }
    }
    
    function createContract(
        string provider,
        string description,
        string name,
        string date,
        uint rate,
        uint recurrenceNo,
        uint unit,
        address owner,
        address client
        ) public {
        Contract memory tempContract = Contract(provider, description, name, date, "pending", contractIdCounter, rate, recurrenceNo, unit, owner, client);
        contractToAddress[contractIdCounter] = msg.sender;
        idToContract[contractIdCounter] = tempContract;
        contractIdCounter++;
        if(addressToContractArray[msg.sender].length != 0){
            addressToContractArray[msg.sender].push(tempContract);
        }else{
            Contract[] memory contracts = new Contract[](1);
            contracts[0] = tempContract;
            addressToContractArray[msg.sender] = contracts;
        }
    }
    
    function acceptContract(uint id) public payable ownerOfContract(id) returns(bool){
        require(bytes(idToContract[id].provider).length!= 0);
        require(msg.value >= idToContract[id].rate);
        idToContract[id].status = "ongoing";
        idToContract[id].owner.transfer(msg.value);
        emit contractAccepted(id, msg.sender, idToContract[id].client);
        return true;
    }
    
    function getContract(uint id) public returns(
        string provider,
        string description,
        string name,
        string date,
        uint rate,
        uint recurrenceNo,
        uint unit
        ){
        require(bytes(idToContract[id].provider).length != 0);
        return(
            idToContract[id].provider,
            idToContract[id].description,
            idToContract[id].name,
            idToContract[id].date,
            idToContract[id].rate,
            idToContract[id].recurrenceNo,
            idToContract[id].unit
            );
        
    }
    
    function getTemplate(uint id) public returns(
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
        idToContract[id].provider = provider;
        emit UpdateContract(
            provider,
            idToContract[id].description,
            idToContract[id].name,
            idToContract[id].date,
            idToContract[id].status,
            idToContract[id].id,
            idToContract[id].rate,
            idToContract[id].recurrenceNo,
            idToContract[id].unit,
            idToContract[id].owner,
            idToContract[id].client
        );
        return true;
    }
    
    function updateContractDescription(uint id, string description) public ownerOfContract(id) returns(bool){
        idToContract[id].description = description;
        emit UpdateContract(
            idToContract[id].provider,
            description,
            idToContract[id].name,
            idToContract[id].date,
            idToContract[id].status,
            idToContract[id].id,
            idToContract[id].rate,
            idToContract[id].recurrenceNo,
            idToContract[id].unit,
            idToContract[id].owner,
            idToContract[id].client
        );
        return true;
    }
    function updateContractName(uint id, string name) public ownerOfContract(id) returns(bool){
        idToContract[id].name = name;
        emit UpdateContract(
            idToContract[id].provider,
            idToContract[id].description,
            name,
            idToContract[id].date,
            idToContract[id].status,
            idToContract[id].id,
            idToContract[id].rate,
            idToContract[id].recurrenceNo,
            idToContract[id].unit,
            idToContract[id].owner,
            idToContract[id].client
        );
        return true;
    }
    
    function updateContractDate(uint id, string date) public ownerOfContract(id) returns(bool){
        idToContract[id].date = date;
        emit UpdateContract(
            idToContract[id].provider,
            idToContract[id].description,
            idToContract[id].name,
            date,
            idToContract[id].status,
            idToContract[id].id,
            idToContract[id].rate,
            idToContract[id].recurrenceNo,
            idToContract[id].unit,
            idToContract[id].owner,
            idToContract[id].client
        );
        return true;
    }
    
    function updateContractStatus(uint id, string status) public returns(bool){
        idToContract[id].status = status;
        emit UpdateContract(
            idToContract[id].provider,
            idToContract[id].description,
            idToContract[id].name,
            idToContract[id].date,
            status,
            idToContract[id].id,
            idToContract[id].rate,
            idToContract[id].recurrenceNo,
            idToContract[id].unit,
            idToContract[id].owner,
            idToContract[id].client
        );
        return true;
        
    }
    
    function updateContractRate(uint id, uint rate) public ownerOfContract(id) returns(bool){
        idToContract[id].rate = rate;
        emit UpdateContract(
            idToContract[id].provider,
            idToContract[id].description,
            idToContract[id].name,
            idToContract[id].date,
            idToContract[id].status,
            idToContract[id].id,
            rate,
            idToContract[id].recurrenceNo,
            idToContract[id].unit,
            idToContract[id].owner,
            idToContract[id].client
        );
        return true;
    }
    function updateContractRecurringNo(uint id, uint recurrenceNo) public ownerOfContract(id) returns(bool){
        idToContract[id].recurrenceNo = recurrenceNo;
        emit UpdateContract(
            idToContract[id].provider,
            idToContract[id].description,
            idToContract[id].name,
            idToContract[id].date,
            idToContract[id].status,
            idToContract[id].id,
            idToContract[id].rate,
            recurrenceNo,
            idToContract[id].unit,
            idToContract[id].owner,
            idToContract[id].client
        );
        return true;
    }
    function updateContractUnit(uint id, uint unit) public ownerOfContract(id) returns(bool){
        idToContract[id].unit = unit;
        emit UpdateContract(
            idToContract[id].provider,
            idToContract[id].description,
            idToContract[id].name,
            idToContract[id].date,
            idToContract[id].status,
            idToContract[id].id,
            idToContract[id].rate,
            idToContract[id].recurrenceNo,
            unit,
            idToContract[id].owner,
            idToContract[id].client
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
        delete idToContract[id];
        return true;
    }
    
    function updateSecondaryContractMapping(Contract tempContract) internal {
        for(uint i = 0; i < addressToContractArray[msg.sender].length; i ++){
            if(addressToContractArray[msg.sender][i].id == tempContract.id){
                addressToContractArray[msg.sender][i] = tempContract;
            }
        }
    }
    // admin functions, add isEidtor modifier
    function getAllContract() public {
        
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
    function editMapping(string username, address add) external isEditor{
        //Todo: change mapping
    }
    
    
}
 


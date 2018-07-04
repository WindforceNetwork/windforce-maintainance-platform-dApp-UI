pragma solidity ^0.4.0;

contract accountContract{
    event newAccount (
        string username,
        string name,
        string company
        );
    event updateAccount(
        string username,
        string name,
        string company
        );
    event registerAccount(
        string username,
        address add
        );
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
        emit registerAccount(username, msg.sender);
        return true;
    }
    function register(string username, string name, string company) external returns (bool){
        require(bytes(usernameToAccount[username].name).length == 0);
        require(usernameToAddress[username] != 0);
        usernameToAddress[username] = msg.sender;
        Account memory acc = Account(name, company);
        usernameToAccount[username] = acc;
        emit newAccount(username, name, company);
    }
    
    function updateUserInfo(string username, string name, string company) external ownerOf(username){
        Account memory acc = Account(name, company);
        usernameToAccount[username] = acc;
        emit updateAccount(username, acc.name, acc.company);
    }
    function editorChanges(string username, string name, string company) external isEditor {
        Account memory acc = Account(name, company);
        usernameToAccount[username] = acc;
    }
    function editMapping(string username, address add) external isEditor{
        //Todo: change mapping
    }
    
    
}
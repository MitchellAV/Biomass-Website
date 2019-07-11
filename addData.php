<?php
  require_once 'login.php';
  // Create connection with MySQL database
  $conn = new mysqli($hn,$un,$pw,$db);
  if ($conn->connect_error)die("Connection failed: ".$conn->connect_error);
  echo "Connected successfully<br>";

  // $query = "CREATE TABLE test (
  //   id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  //   data INT UNSIGNED)
  //   ENGINE MyISAM";

  $query = "CREATE TABLE data (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    timedata CHAR(16) NOT NULL UNIQUE,
    ambTemp DECIMAL(4,2) NOT NULL,
    tankTemp DECIMAL(4,2) NOT NULL,
    adTemp DECIMAL(4,2) NOT NULL,
    cfm DECIMAL(4,2) NOT NULL,
    massFlow DECIMAL(4,2) NOT NULL,
    irradiance DECIMAL(7,2) NOT NULL,
    ph DECIMAL(4,2) NOT NULL,
    rpm DECIMAL(7,2) NOT NULL,
    tankErr TINYINT NOT NULL,
    adErr TINYINT NOT NULL
  )
    ENGINE MyISAM";

    print_r($_POST);

  $id= $_POST['id'];
  $timedata= $_POST['timedata'];
  $ambTemp = $_POST['ambTemp'];
  $tankTemp= $_POST['tankTemp'];
  $adTemp = $_POST['adTemp'];
  $cfm= $_POST['cfm'];
  $massFlow= $_POST['massFlow'];
  $irradiance=$_POST['irradiance'];
  $ph=$_POST['ph'];
  $rpm= $_POST['rpm'];
  $tankErr= $_POST['tankErr'];
  $adErr= $_POST['adErr'];


//  $text = sanitizeMySQL($conn, $_POST['string']);
  // $write = "<p>Sent String: $text</p>";
  // file_put_contents('index.php',$write);
//('timedata', 'ambTemp', 'tankTemp', 'adTemp', 'tankErr', 'adErr', 'scfm', 'cfm', 'massFlow', 'irradiance', 'ph', 'rpm')

  $query = "INSERT INTO data VALUES(NULL,'$timedata', '$ambTemp','$tankTemp','$adTemp', '$cfm','$massFlow','$irradiance','$ph','$rpm','$tankErr','$adErr')";
  echo $query;
  

  //$query = "DROP TABLE test";
  $result = $conn->query($query);
  if (!$result)die("Database access faild: ".$conn->error);


// Close connections to database
  $conn->close();








  // Sanitizing functions
    function sanitizeString($var) {
      if(get_magic_quotes_gpc()) $var = stripslashes($var);
      $var = strip_tags($var);
      $var = htmlentities($var);
      return $var;
    }
    function sanitizeMySQL($connection, $var) {
      $var = $connection->real_escape_string($var);
      $var = sanitizeString($var);
      return $var;
    }
    function fixFileName($name){
      return strtolower(preg_replace("[^A‐Za‐z0‐9.]", "", $name));
    }
?>

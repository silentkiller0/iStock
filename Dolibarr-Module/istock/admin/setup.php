<?php
/* Copyright (C) 2004-2017 Laurent Destailleur  <eldy@users.sourceforge.net>
 * Copyright (C) 2020 SuperAdmin <fahd@anexys.fr>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * \file    istock/admin/setup.php
 * \ingroup istock
 * \brief   IStock setup page.
 */

// Load Dolibarr environment
$res = 0;
// Try main.inc.php into web root known defined into CONTEXT_DOCUMENT_ROOT (not always defined)
if (!$res && !empty($_SERVER["CONTEXT_DOCUMENT_ROOT"])) $res = @include $_SERVER["CONTEXT_DOCUMENT_ROOT"]."/main.inc.php";
// Try main.inc.php into web root detected using web root calculated from SCRIPT_FILENAME
$tmp = empty($_SERVER['SCRIPT_FILENAME']) ? '' : $_SERVER['SCRIPT_FILENAME']; $tmp2 = realpath(__FILE__); $i = strlen($tmp) - 1; $j = strlen($tmp2) - 1;
while ($i > 0 && $j > 0 && isset($tmp[$i]) && isset($tmp2[$j]) && $tmp[$i] == $tmp2[$j]) { $i--; $j--; }
if (!$res && $i > 0 && file_exists(substr($tmp, 0, ($i + 1))."/main.inc.php")) $res = @include substr($tmp, 0, ($i + 1))."/main.inc.php";
if (!$res && $i > 0 && file_exists(dirname(substr($tmp, 0, ($i + 1)))."/main.inc.php")) $res = @include dirname(substr($tmp, 0, ($i + 1)))."/main.inc.php";
// Try main.inc.php using relative path
if (!$res && file_exists("../../main.inc.php")) $res = @include "../../main.inc.php";
if (!$res && file_exists("../../../main.inc.php")) $res = @include "../../../main.inc.php";
if (!$res) die("Include of main fails");

global $langs, $user;

// Libraries
require_once DOL_DOCUMENT_ROOT."/core/lib/admin.lib.php";
require_once '../lib/istock.lib.php';
require_once "../core/modules/modIStock.class.php";

// Translations
$langs->loadLangs(array("admin", "istock@istock"));

// Access control
if (!$user->admin) accessforbidden();

// Parameters
$action = GETPOST('action', 'alpha');
$backtopage = GETPOST('backtopage', 'alpha');

/*
$arrayofparameters = array(
	'ISTOCK_MYPARAM1'=>array('css'=>'minwidth200', 'enabled'=>1),
	'ISTOCK_MYPARAM2'=>array('css'=>'minwidth200', 'enabled'=>1),
	'ISTOCK_MYPARAM3'=>array('css'=>'minwidth200', 'enabled'=>1),
);
*/

// get my settings labels from modIStock const
$modIStock = new modIStock($db);
$arrayofparameters = array(
	'hhh' =>array('css'=>'minwidth200', 'enabled'=>1)
);

// get the values from the db
$sql = "SELECT * FROM llx_istock_configuration where rowid = 1";
$res = $db->query($sql);

//print("<pre>".print_r($res,true)."</pre>");


if ($res->num_rows > 0) {
	$row = $db->fetch_array($sql);
	
	//print("<pre>".print_r($row,true)."</pre>");

	$ISTOCK_AUTO_CREATION = $row['auto_creation'];

}else{
	
	$ISTOCK_AUTO_CREATION = 'Nothing...';
}


//print("<pre>".print_r($modIStock->const[1],true)."</pre>");
//die();

/*
 * Actions
 */

if ((float) DOL_VERSION >= 6)
{
	include DOL_DOCUMENT_ROOT.'/core/actions_setmoduleoptions.inc.php';
}



/*
 * View
 */

$page_name = "IStockSetup";
llxHeader('', $langs->trans($page_name));

// Subheader
$linkback = '<a href="'.($backtopage ? $backtopage : DOL_URL_ROOT.'/admin/modules.php?restore_lastsearch_values=1').'">'.$langs->trans("BackToModuleList").'</a>';

print load_fiche_titre($langs->trans($page_name), $linkback, 'object_istock@istock');

// Configuration header
$head = istockAdminPrepareHead();
dol_fiche_head($head, 'settings', '', -1, "istock@istock");

// Setup page goes here
// echo '<span class="opacitymedium">'.$langs->trans("IStockSetupPage").'</span><br><br>';


if ($action == 'update')
{
	
	if($_POST['auto_count_creation'] != 'true' && $_POST['auto_count_creation'] != 'false'){
		?>
		<script>
			alert("La valeur de 'création des comptes en automatique' n'est pas respecté !\nVeuillez renseigner 'true' ou 'false' dans ce champ.");
		</script>
		<?php

	}else{
		//print("<pre>".print_r($_POST,true)."</pre>");
		$ISTOCK_AUTO_CREATION = $_POST['auto_count_creation'];
	
		if ($res->num_rows == 0) {
			
			//If first insert or no values in Database
			$sql = "INSERT INTO llx_istock_configuration (rowid, auto_creation) VALUES(1, '".$ISTOCK_AUTO_CREATION."')";
			$db->query($sql);

		}else{
			//Update values in Database
			$sql = "UPDATE llx_istock_configuration SET auto_creation='".$ISTOCK_AUTO_CREATION."' WHERE rowid = 1";
			$res = $db->query($sql);
		}
		
		$db->commit();
		header("location:setup.php");
	}

}

?>

<form id="form_istock" name="form_istock" method="POST" action="setup.php">
	
	<input type="hidden" name="action" value="update">
	<h3>Autoriser la création des comptes en automatique : </h3>
	<input type="text" name="auto_count_creation" maxlength="5" value="<?php print $ISTOCK_AUTO_CREATION ?>"/>

	<br>
	<br>
	<br>
	<div id="maj_const" onclick="document.getElementById('form_istock').submit()">Update</div>

</form>

<style>
#maj_const{
	border: 1px solid black;
	width: 100px;
	text-align: center;
	padding: 7px 0px;
	font-size: 15px;
	font-weight: bold;
	background: #306da0;
	text-shadow: 1px 1px 1px black;
	color: white;
	cursor: pointer;
	transition:0.2s ease;
}
#maj_const:hover{
	opacity:0.7;
}
</style>
 
<?php

// Page end
dol_fiche_end();

llxFooter();
$db->close();

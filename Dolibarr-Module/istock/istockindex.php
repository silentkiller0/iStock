<?php
/* Copyright (C) 2001-2005 Rodolphe Quiedeville <rodolphe@quiedeville.org>
 * Copyright (C) 2004-2015 Laurent Destailleur  <eldy@users.sourceforge.net>
 * Copyright (C) 2005-2012 Regis Houssin        <regis.houssin@inodbox.com>
 * Copyright (C) 2015      Jean-François Ferry	<jfefe@aternatik.fr>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

/**
 *	\file       istock/istockindex.php
 *	\ingroup    istock
 *	\brief      Home page of istock top menu
 */
/*
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
*/

// Load Dolibarr environment
$res=0;
// Try main.inc.php into web root known defined into CONTEXT_DOCUMENT_ROOT (not always defined)
if (! $res && ! empty($_SERVER["CONTEXT_DOCUMENT_ROOT"])) $res=@include $_SERVER["CONTEXT_DOCUMENT_ROOT"]."/main.inc.php";
// Try main.inc.php into web root detected using web root calculated from SCRIPT_FILENAME
$tmp=empty($_SERVER['SCRIPT_FILENAME'])?'':$_SERVER['SCRIPT_FILENAME'];$tmp2=realpath(__FILE__); $i=strlen($tmp)-1; $j=strlen($tmp2)-1;
while($i > 0 && $j > 0 && isset($tmp[$i]) && isset($tmp2[$j]) && $tmp[$i]==$tmp2[$j]) { $i--; $j--; }
if (! $res && $i > 0 && file_exists(substr($tmp, 0, ($i+1))."/main.inc.php")) $res=@include substr($tmp, 0, ($i+1))."/main.inc.php";
if (! $res && $i > 0 && file_exists(dirname(substr($tmp, 0, ($i+1)))."/main.inc.php")) $res=@include dirname(substr($tmp, 0, ($i+1)))."/main.inc.php";
// Try main.inc.php using relative path
if (! $res && file_exists("../main.inc.php")) $res=@include "../main.inc.php";
if (! $res && file_exists("../../main.inc.php")) $res=@include "../../main.inc.php";
if (! $res && file_exists("../../../main.inc.php")) $res=@include "../../../main.inc.php";
if (! $res) die("Include of main fails");

require_once DOL_DOCUMENT_ROOT.'/core/class/html.formfile.class.php';

// Load translation files required by the page
$langs->loadLangs(array("istock@istock"));

$action=GETPOST('action', 'alpha');


// Security check
//if (! $user->rights->istock->myobject->read) accessforbidden();
$socid=GETPOST('socid', 'int');
if (isset($user->socid) && $user->socid > 0)
{
	$action = '';
	$socid = $user->socid;
}

$max=5;
$now=dol_now();


/*
 * GET ALL DATA
 */

//print dirname(__FILE__);
// Check all backend scripts before loading...
if(!is_file('backend/load_event_statistic.php') || !is_file('backend/load_user_statistic.php')){
	die("Backend scripts are missing!");
}

// get iStock user statis data
require_once ('backend/load_user_statistic.php');

$load = new Load_User_Statistic($db);
$load->Load_Data();
$load->Load_Mobile_Data();

//print("<pre>".print_r($load->return_Data(), true)."</pre>");

$accounts_ = $load->accounts_;
$adminAccountColors = $load->adminAccountColors;
$otherAccountColors = $load->otherAccountColors;
$account_data = $load->account_data;

$OS_DEVICE_ = $load->OS_DEVICE_;
$OS_DEVICE_BG_Colors = $load->OS_DEVICE_BG_Colors;
$OS_DEVICE_BD_Colors = $load->OS_DEVICE_BD_Colors;
$OS_DEVICE_data = $load->OS_DEVICE_data;



// get iStock event statis data
require_once ('backend/load_event_statistic.php');

$load = new Load_Event_Statistic($db);
$load->Load_Data();
//print("<pre>".print_r($load->Load_Data(), true)."</pre>");

$months_ = $load->months_;
$currentYearColors = $load->currentYearColors;
$lastYearColors = $load->lastYearColors;
$eventListOfEachMonth_thisYear = $load->eventListOfEachMonth_thisYear;
$eventListOfEachMonth_lastYear = $load->eventListOfEachMonth_lastYear;

/*
 * Actions
 */

// None


/*
 * View
 */


llxHeader("", $langs->trans("IStockArea"));

print load_fiche_titre($langs->trans("IStock Dashbord"), '', 'istock.png@istock');

//print '<div class="fichecenter">';


// BEGIN MODULEBUILDER DRAFT MYOBJECT
?>
<div style="display: flex; flex-wrap: wrap; marging: 10px">
	<div class="chart-container" style="position: relative; padding: 10px; width: 500px; height: auto;">
		<canvas id="myChart_auth"></canvas>
	</div>
	<div class="chart-container" style="position: relative; padding: 10px; width: 600px; height: auto;">
		<canvas id="myChart"></canvas>
	</div>
	<div class="chart-container" style="position: relative; padding: 10px; width: 600px; height: auto;">
		<canvas id="myChart_device"></canvas>
	</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
<script>
//  User data chart
const accounts = <?php print $accounts_ ?>;
const account_data = [
	<?php print $account_data[0]['numbers'] ?>,
	<?php print $account_data[1]['numbers'] ?>
];

var ctx = document.getElementById('myChart_auth').getContext('2d');
var myChart_auth = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: accounts,
        datasets: [{
            label: "<?php print "Numbre de compte iStock" ?>",
            data: account_data,
            backgroundColor: [
                '<?php print $adminAccountColors['backgroundColor'] ?>',
                '<?php print $otherAccountColors['backgroundColor'] ?>'
            ],
            borderColor: [
                '<?php print $adminAccountColors['borderColor'] ?>',
				'<?php print $otherAccountColors['borderColor'] ?>'
            ],
            borderWidth: 1
        }]
    },
    options: {
		responsive: true,
		legend: {
            position: 'bottom',
        },
		animation: {
            animateScale: true,
            animateRotate: true
        },
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero:true
				}
			}]
		}
    }
});

// Events chart data
const months = <?php print $months_ ?>;

const current_year_data = [
<?php print $eventListOfEachMonth_thisYear[0]['Events'] ?>, 
<?php print $eventListOfEachMonth_thisYear[1]['Events'] ?>, 
<?php print $eventListOfEachMonth_thisYear[2]['Events'] ?>, 
<?php print $eventListOfEachMonth_thisYear[3]['Events'] ?>, 
<?php print $eventListOfEachMonth_thisYear[4]['Events'] ?>, 
<?php print $eventListOfEachMonth_thisYear[5]['Events'] ?>, 
<?php print $eventListOfEachMonth_thisYear[6]['Events'] ?>,
<?php print $eventListOfEachMonth_thisYear[7]['Events'] ?>,
<?php print $eventListOfEachMonth_thisYear[8]['Events'] ?>,
<?php print $eventListOfEachMonth_thisYear[9]['Events'] ?>,
<?php print $eventListOfEachMonth_thisYear[10]['Events'] ?>,
<?php print $eventListOfEachMonth_thisYear[11]['Events'] ?>
];

const last_year_data = [
<?php print $eventListOfEachMonth_lastYear[0]['Events'] ?>, 
<?php print $eventListOfEachMonth_lastYear[1]['Events'] ?>, 
<?php print $eventListOfEachMonth_lastYear[2]['Events'] ?>, 
<?php print $eventListOfEachMonth_lastYear[3]['Events'] ?>, 
<?php print $eventListOfEachMonth_lastYear[4]['Events'] ?>, 
<?php print $eventListOfEachMonth_lastYear[5]['Events'] ?>, 
<?php print $eventListOfEachMonth_lastYear[6]['Events'] ?>,
<?php print $eventListOfEachMonth_lastYear[7]['Events'] ?>,
<?php print $eventListOfEachMonth_lastYear[8]['Events'] ?>,
<?php print $eventListOfEachMonth_lastYear[9]['Events'] ?>,
<?php print $eventListOfEachMonth_lastYear[10]['Events'] ?>,
<?php print $eventListOfEachMonth_lastYear[11]['Events'] ?>
];

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: months,
        datasets: [{
            label: "<?php print "Numbre d'evenement cette annee" ?>",
            data: current_year_data,
            backgroundColor: [
                '<?php print $currentYearColors['backgroundColor'] ?>',
                '<?php print $currentYearColors['backgroundColor'] ?>',
                '<?php print $currentYearColors['backgroundColor'] ?>',
                '<?php print $currentYearColors['backgroundColor'] ?>',
                '<?php print $currentYearColors['backgroundColor'] ?>',
                '<?php print $currentYearColors['backgroundColor'] ?>',
				'<?php print $currentYearColors['backgroundColor'] ?>',
				'<?php print $currentYearColors['backgroundColor'] ?>',
				'<?php print $currentYearColors['backgroundColor'] ?>',
				'<?php print $currentYearColors['backgroundColor'] ?>',
				'<?php print $currentYearColors['backgroundColor'] ?>',
				'<?php print $currentYearColors['backgroundColor'] ?>'
            ],
            borderColor: [
                '<?php print $currentYearColors['borderColor'] ?>',
                '<?php print $currentYearColors['borderColor'] ?>',
                '<?php print $currentYearColors['borderColor'] ?>',
                '<?php print $currentYearColors['borderColor'] ?>',
                '<?php print $currentYearColors['borderColor'] ?>',
                '<?php print $currentYearColors['borderColor'] ?>',
				'<?php print $currentYearColors['borderColor'] ?>',
				'<?php print $currentYearColors['borderColor'] ?>',
				'<?php print $currentYearColors['borderColor'] ?>',
				'<?php print $currentYearColors['borderColor'] ?>',
				'<?php print $currentYearColors['borderColor'] ?>',
				'<?php print $currentYearColors['borderColor'] ?>'
            ],
            borderWidth: 1
        },
		{
            label: "Numbre d'evenement l'annee precedant",
            data: last_year_data,
            backgroundColor: [
                '<?php print $lastYearColors['backgroundColor'] ?>',
                '<?php print $lastYearColors['backgroundColor'] ?>',
                '<?php print $lastYearColors['backgroundColor'] ?>',
                '<?php print $lastYearColors['backgroundColor'] ?>',
                '<?php print $lastYearColors['backgroundColor'] ?>',
                '<?php print $lastYearColors['backgroundColor'] ?>',
				'<?php print $lastYearColors['backgroundColor'] ?>',
				'<?php print $lastYearColors['backgroundColor'] ?>',
				'<?php print $lastYearColors['backgroundColor'] ?>',
				'<?php print $lastYearColors['backgroundColor'] ?>',
				'<?php print $lastYearColors['backgroundColor'] ?>',
				'<?php print $lastYearColors['backgroundColor'] ?>'
            ],
            borderColor: [
                '<?php print $lastYearColors['borderColor'] ?>',
                '<?php print $lastYearColors['borderColor'] ?>',
                '<?php print $lastYearColors['borderColor'] ?>',
                '<?php print $lastYearColors['borderColor'] ?>',
                '<?php print $lastYearColors['borderColor'] ?>',
                '<?php print $lastYearColors['borderColor'] ?>',
				'<?php print $lastYearColors['borderColor'] ?>',
				'<?php print $lastYearColors['borderColor'] ?>',
				'<?php print $lastYearColors['borderColor'] ?>',
				'<?php print $lastYearColors['borderColor'] ?>',
				'<?php print $lastYearColors['borderColor'] ?>',
				'<?php print $lastYearColors['borderColor'] ?>'
            ],
            borderWidth: 1
        }]
    },
    options: {
		responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


// User device data
const _OS_DEVICE_ = <?php print $OS_DEVICE_ ?>;
const _OS_DEVICE_data_ = [
	<?php print $OS_DEVICE_data['Android'] ?>,
	<?php print $OS_DEVICE_data['IOS'] ?>,
	<?php print $OS_DEVICE_data['Telephone'] ?>,
	<?php print $OS_DEVICE_data['Tablette'] ?>
];


var ctx = document.getElementById('myChart_device').getContext('2d');
var mixedChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: _OS_DEVICE_,
        datasets: [{
            label: "<?php print "Numbre de type d'appareil" ?>",
            data: _OS_DEVICE_data_,
            backgroundColor: [
                '<?php print $OS_DEVICE_BG_Colors['backgroundColor'][0] ?>',
				'<?php print $OS_DEVICE_BG_Colors['backgroundColor'][1] ?>',
				'<?php print $OS_DEVICE_BG_Colors['backgroundColor'][2] ?>',
				'<?php print $OS_DEVICE_BG_Colors['backgroundColor'][3] ?>'
            ],
            borderColor: [
				'<?php print $OS_DEVICE_BD_Colors['borderColor'][0] ?>',
				'<?php print $OS_DEVICE_BD_Colors['borderColor'][1] ?>',
				'<?php print $OS_DEVICE_BD_Colors['borderColor'][2] ?>',
				'<?php print $OS_DEVICE_BD_Colors['borderColor'][3] ?>'
            ],
            borderWidth: 1
        }]
    },
    options: {
		responsive: true,
		legend: {
            position: 'top',
        },
		scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
</script>
<?php
//END MODULEBUILDER DRAFT MYOBJECT /


//print '<div class="fichetwothirdright"><div class="ficheaddleft">';


$NBMAX=3;
$max=3;

/* BEGIN MODULEBUILDER LASTMODIFIED MYOBJECT
// Last modified myobject
if (! empty($conf->istock->enabled) && $user->rights->istock->read)
{
	$sql = "SELECT s.rowid, s.nom as name, s.client, s.datec, s.tms, s.canvas";
    $sql.= ", s.code_client";
	$sql.= " FROM ".MAIN_DB_PREFIX."societe as s";
	if (! $user->rights->societe->client->voir && ! $socid) $sql.= ", ".MAIN_DB_PREFIX."societe_commerciaux as sc";
	$sql.= " WHERE s.client IN (1, 2, 3)";
	$sql.= " AND s.entity IN (".getEntity($companystatic->element).")";
	if (! $user->rights->societe->client->voir && ! $socid) $sql.= " AND s.rowid = sc.fk_soc AND sc.fk_user = " .$user->id;
	if ($socid)	$sql.= " AND s.rowid = $socid";
	$sql .= " ORDER BY s.tms DESC";
	$sql .= $db->plimit($max, 0);

	$resql = $db->query($sql);
	if ($resql)
	{
		$num = $db->num_rows($resql);
		$i = 0;

		print '<table class="noborder centpercent">';
		print '<tr class="liste_titre">';
		print '<th colspan="2">';
		if (empty($conf->global->SOCIETE_DISABLE_PROSPECTS) && empty($conf->global->SOCIETE_DISABLE_CUSTOMERS)) print $langs->trans("BoxTitleLastCustomersOrProspects",$max);
        else if (! empty($conf->global->SOCIETE_DISABLE_CUSTOMERS)) print $langs->trans("BoxTitleLastModifiedProspects",$max);
		else print $langs->trans("BoxTitleLastModifiedCustomers",$max);
		print '</th>';
		print '<th class="right">'.$langs->trans("DateModificationShort").'</th>';
		print '</tr>';
		if ($num)
		{
			while ($i < $num)
			{
				$objp = $db->fetch_object($resql);
				$companystatic->id=$objp->rowid;
				$companystatic->name=$objp->name;
				$companystatic->client=$objp->client;
                $companystatic->code_client = $objp->code_client;
                $companystatic->code_fournisseur = $objp->code_fournisseur;
                $companystatic->canvas=$objp->canvas;
				print '<tr class="oddeven">';
				print '<td class="nowrap">'.$companystatic->getNomUrl(1,'customer',48).'</td>';
				print '<td class="right nowrap">';
				print $companystatic->getLibCustProspStatut();
				print "</td>";
				print '<td class="right nowrap">'.dol_print_date($db->jdate($objp->tms),'day')."</td>";
				print '</tr>';
				$i++;


			}

			$db->free($resql);
		}
		else
		{
			print '<tr class="oddeven"><td colspan="3" class="opacitymedium">'.$langs->trans("None").'</td></tr>';
		}
		print "</table><br>";
	}
}
*/

//print '</div></div>';

// End of page
llxFooter();
$db->close();

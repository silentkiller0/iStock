<?php
$action_1 = $_POST['action_1'];
$action_2 = $_POST['action_2'];

if ($action_1 == 'update')
{
	if($action_2 == 'add_key'){
		if(!empty($_POST['istock_key'])){
			$ISTOCK_KEY = $_POST['istock_key'];
			$sql = "INSERT INTO `llx_user` (`rowid`, `entity`, `ref_ext`, `ref_int`, `employee`, `fk_establishment`, `datec`, `tms`, `fk_user_creat`, `fk_user_modif`, `login`, `pass`, `pass_crypted`, `pass_temp`, `api_key`, `gender`, `civility`, `lastname`, `firstname`, `address`, `zip`, `town`, `fk_state`, `fk_country`, `job`, `skype`, `office_phone`, `office_fax`, `user_mobile`, `personal_mobile`, `email`, `personal_email`, `socialnetworks`, `signature`, `admin`, `module_comm`, `module_compta`, `fk_soc`, `fk_socpeople`, `fk_member`, `fk_user`, `fk_user_expense_validator`, `fk_user_holiday_validator`, `note_public`, `note`, `model_pdf`, `datelastlogin`, `datepreviouslogin`, `egroupware_id`, `ldap_sid`, `openid`, `statut`, `photo`, `lang`, `color`, `barcode`, `fk_barcode_type`, `accountancy_code`, `nb_holiday`, `thm`, `tjm`, `salary`, `salaryextra`, `dateemployment`, `dateemploymentend`, `weeklyhours`, `import_key`, `birth`, `pass_encoding`, `default_range`, `default_c_exp_tax_cat`, `twitter`, `facebook`, `instagram`, `snapchat`, `googleplus`, `youtube`, `whatsapp`, `linkedin`, `fk_warehouse`, `iplastlogin`, `ippreviouslogin`) 
					VALUES (NULL, '1', NULL, NULL, '1', '0', NULL, CURRENT_TIMESTAMP, NULL, NULL, 'istock', 'anexys1,', NULL, NULL, '".$ISTOCK_KEY."', NULL, NULL, 'iStock', NULL, NULL, NULL, NULL, '0', '0', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1', '1', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, '0', NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);";
			$res = $db->query($sql);
			$db->commit();
		}else{
			?><script>alert("La clé licence ne paut pas etre vide!!");</script><?php
		}
	}

	if($action_2 == 'delete_key'){
		if(!empty($_POST['istock_key_d'])){
			$sql = "DELETE FROM llx_user where login = 'istock' AND lastname = 'iStock'";
			$res = $db->query($sql);
			$db->commit();
			$ISTOCK_KEY = "";
		}
	}
	
	if($action_2 == 'update_account_creation'){
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
}
?>
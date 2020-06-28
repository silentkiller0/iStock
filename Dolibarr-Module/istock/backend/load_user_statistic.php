<?php
class Load_User_Statistic {
	
	public $db;
	public $accounts = ['SuperAdmin','other'];
	public $accounts_ = "['SuperAdmin','Autre']";
	
	public $adminAccountColors = array('backgroundColor' => 'rgba(171,205,239, 0.6)', 'borderColor' => 'rgba(171,205,239, 1)');
	public $otherAccountColors = array('backgroundColor' => 'rgba(0, 0, 255, 0.6)', 'borderColor' => 'rgba(0, 0, 255, 1)');
	public $account_data = array(0 => array('Account' => 'SuperAdmin', 'numbers' => 4), 
								1 => array('Account' => 'other', 'numbers' => 9)
	);
	
	public $OS_DEVICE = ['Android', 'IOS', 'Telephone', 'Tablette'];
	public $OS_DEVICE_ = "['Android', 'IOS', 'Telephone', 'Tablette']";
	
	public $OS_DEVICE_BG_Colors = array('backgroundColor' => array( 0 => 'rgba(0, 0, 255, 0.6)', 1 => 'rgba(0, 0, 255, 0.6)', 2 => 'rgba(171,205,239, 0.6)', 3 => 'rgba(171,205,239, 0.6)'));
	public $OS_DEVICE_BD_Colors = array('borderColor' => array( 0 => 'rgba(171,205,239, 1)', 1 => 'rgba(171,205,239, 1)', 2 => 'rgba(0, 0, 255, 1)', 3 => 'rgba(0, 0, 255, 1)'));
	public $OS_DEVICE_data = array('Android' => 0, 'IOS' => 0, 'Telephone' => 0, 'Tablette' => 0);
	
	public function __construct($db_){ 
		$this->db = $db_;
	}
	
	public function return_Data(){
		return array(
			'accounts_' => $this->accounts_,
			'adminAccountColors' => $this->adminAccountColors,
			'otherAccountColors' => $this->otherAccountColors,
			'account_data' => $this->account_data,
			'OS_DEVICE_' => $this->OS_DEVICE_,
			'OS_DEVICE_BG_Colors' => $this->OS_DEVICE_BG_Colors,
			'OS_DEVICE_BD_Colors' => $this->OS_DEVICE_BD_Colors,
			'OS_DEVICE_data' => $this->OS_DEVICE_data
		);
	}
	

	// get account type, device platform and device type data
	public function Load_Data(){

		// get admin account number
		$sql = "SELECT Count(*) as total FROM llx_istock_authentification as auth, llx_user as user WHERE auth.fk_user = user.rowid and (user.lastname LIKE '%admin%' OR user.lastname LIKE '%Admin%')";
		$res = $this->db->query($sql);
		
		if ($res->num_rows > 0) {
			
			while($row = $this->db->fetch_array($sql)){

				$total_ = $row['total'];
			}
			
			$this->account_data[0]['numbers'] = $total_;
			//print("<pre>".print_r($this->account_data, true)."</pre>");
			
		}

		// get none admin account number
		$sql = "SELECT Count(*) as total FROM llx_istock_authentification as auth, llx_user as user WHERE auth.fk_user = user.rowid and (user.lastname NOT LIKE '%admin%' OR user.lastname NOT LIKE '%Admin%')";
		$res = $this->db->query($sql);

		if ($res->num_rows > 0) {
			
			while($row = $this->db->fetch_array($sql)){
				
				$total_ = $row['total'];
			}
			
			$this->account_data[1]['numbers'] = $total_;
			//print("<pre>".print_r($eventListEachMonth, true)."</pre>");

		}

	}
	
	public function Load_Mobile_Data(){
		
		$sql = "SELECT Count(*) as total FROM llx_istock_authentification as auth, llx_user as user WHERE auth.fk_user = user.rowid AND (auth.device_platform  LIKE '%Android%' OR auth.device_platform  LIKE '%android%')";
		$res = $this->db->query($sql);
		
		if ($res->num_rows > 0) {
			
			while($row = $this->db->fetch_array($sql)){

				$total_ = $row['total'];
			}
			
			$this->OS_DEVICE_data['Android'] = $total_;
			//print("<pre>".print_r($this->OS_DEVICE_data, true)."</pre>");
		}
		
		
		$sql = "SELECT Count(*) as total FROM llx_istock_authentification as auth, llx_user as user WHERE auth.fk_user = user.rowid AND (auth.device_platform  LIKE '%IOS%' OR auth.device_platform  LIKE '%ios%')";
		$res = $this->db->query($sql);
		
		if ($res->num_rows > 0) {
			
			while($row = $this->db->fetch_array($sql)){

				$total_ = $row['total'];
			}
			
			$this->OS_DEVICE_data['IOS'] = $total_;
			//print("<pre>".print_r($this->OS_DEVICE_data, true)."</pre>");
		}
		
		
		$sql = "SELECT Count(*) as total FROM llx_istock_authentification as auth, llx_user as user WHERE auth.fk_user = user.rowid AND (auth.device_type LIKE '%Telephone%' OR auth.device_type LIKE '%telephone%')";
		$res = $this->db->query($sql);
		
		if ($res->num_rows > 0) {
			
			while($row = $this->db->fetch_array($sql)){

				$total_ = $row['total'];
			}
			
			$this->OS_DEVICE_data['Telephone'] = $total_;
			//print("<pre>".print_r($this->OS_DEVICE_data, true)."</pre>");
		}
		
		
		$sql = "SELECT Count(*) as total FROM llx_istock_authentification as auth, llx_user as user WHERE auth.fk_user = user.rowid AND (auth.device_type LIKE '%Tablette%' OR auth.device_type LIKE '%tablette%')";
		$res = $this->db->query($sql);
		
		if ($res->num_rows > 0) {
			
			while($row = $this->db->fetch_array($sql)){

				$total_ = $row['total'];
			}
			
			$this->OS_DEVICE_data['Tablette'] = $total_;
			//print("<pre>".print_r($this->OS_DEVICE_data, true)."</pre>");
		}
	}
}

//$load = new Load_User_Statistic();
//print("<pre>".print_r($load->Load_Data(), true)."</pre>");
?>


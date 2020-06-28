<?php
class Load_Event_Statistic {
	
	public $db;
	public $months = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];
	public $months_ = "['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Nouvembre','Decembre']";

	public $currentYearColors = array('backgroundColor' => 'rgba(173,216,230, 0.5)', 'borderColor' => 'rgba(173,216,230, 1)');
	public $lastYearColors = array('backgroundColor' => 'rgba(0, 0, 255, 0.5)', 'borderColor' => 'rgba(0, 0, 255, 1)');
	public $eventListOfEachMonth_thisYear = array(	0 => array('Month' => 'Janvier', 'Events' => 0), 
											1 => array('Month' => 'Fevrier', 'Events' => 0), 
											2 => array('Month' => 'Mars', 'Events' => 0), 
											3 => array('Month' => 'Avril', 'Events' => 0), 
											4 => array('Month' => 'Mai', 'Events' => 0), 
											5 => array('Month' => 'Juin', 'Events' => 0), 
											6 => array('Month' => 'Juillet', 'Events' => 0), 
											7 => array('Month' => 'Aout', 'Events' => 0), 
											8 => array('Month' => 'Septembre', 'Events' => 0), 
											9 => array('Month' => 'Octobre', 'Events' => 0), 
											10 => array('Month' => 'Nouvembre', 'Events' => 0), 
											11 =>array('Month' => 'Decembre', 'Events' => 0)
	);
	public $eventListOfEachMonth_lastYear = array(	0 => array('Month' => 'Janvier', 'Events' => 0), 
											1 => array('Month' => 'Fevrier', 'Events' => 0), 
											2 => array('Month' => 'Mars', 'Events' => 0), 
											3 => array('Month' => 'Avril', 'Events' => 0), 
											4 => array('Month' => 'Mai', 'Events' => 0), 
											5 => array('Month' => 'Juin', 'Events' => 0), 
											6 => array('Month' => 'Juillet', 'Events' => 0), 
											7 => array('Month' => 'Aout', 'Events' => 0), 
											8 => array('Month' => 'Septembre', 'Events' => 0), 
											9 => array('Month' => 'Octobre', 'Events' => 0), 
											10 => array('Month' => 'Nouvembre', 'Events' => 0), 
											11 =>array('Month' => 'Decembre', 'Events' => 0)
	);
	
	public function __construct($db_){ 
        $this->db = $db_;
	}
	
	public function Load_Data(){
		
		$currentYear = date("Y");

		//get current year data
		$sql = "SELECT COUNT(*) as events, MONTHNAME(date_creation) as month, YEAR(date_creation) as year FROM llx_istock_evenement where YEAR(date_creation) = '".$currentYear."' GROUP BY month desc";

		$res = $this->db->query($sql);


		if ($res->num_rows > 0) {
			
			$cpt = 0;
			$eventListEachMonth = [];
			while($row = $this->db->fetch_array($sql)){
				$eventListEachMonth[$cpt] = $row;
				$cpt++;
			}

			//print("<pre>".print_r($months, true)."</pre>");
			//print("<pre>".print_r($eventListEachMonth, true)."</pre>");
			
			// add current year event data
			for($y=0; $y < count($eventListEachMonth); $y++){
				
				for($x=0; $x < count($this->months); $x++){ 
				
					if($this->months[$x] == $eventListEachMonth[$y]['month']){
						
						$this->eventListOfEachMonth_thisYear[$x]['Events'] = $eventListEachMonth[$y]['events'];
						break;
					}
				}
			}
		}

		// get last year data
		$lastYear = date("Y")-1;
		$sql = "SELECT COUNT(*) as events, MONTHNAME(date_creation) as month, YEAR(date_creation) as year FROM llx_istock_evenement where YEAR(date_creation) = '".$lastYear."' GROUP BY month desc";
		$res = $this->db->query($sql);

		if ($res->num_rows > 0) {
			
			$cpt = 0;
			$eventListEachMonth = [];
			while($row = $this->db->fetch_array($sql)){
				$eventListEachMonth[$cpt] = $row;
				$cpt++;
				
			}
			
			//print("<pre>".print_r($months, true)."</pre>");
			//print("<pre>".print_r($eventListEachMonth, true)."</pre>");
			
			// add current year event data
			for($y=0; $y < count($eventListEachMonth); $y++){
				
				for($x=0; $x < count($this->months); $x++){ 
				
					if($this->months[$x] == $eventListEachMonth[$y]['month']){
						
						$this->eventListOfEachMonth_lastYear[$x]['Events'] = $eventListEachMonth[$y]['events'];
						break;
					}
				}
			}
		}

		return array(
			'month_' => $this->months_,
			'currentYearColors' => $this->currentYearColors,
			'lastYearColors' => $this->lastYearColors,
			'eventListOfEachMonth_thisYear' => $this->eventListOfEachMonth_thisYear,
			'eventListOfEachMonth_lastYear' => $this->eventListOfEachMonth_lastYear
		);
	}
}

//$load = new Load_Event_Statistic();
//print("<pre>".print_r($load->Load_Data(), true)."</pre>");
//load_event_statistic.php
?>


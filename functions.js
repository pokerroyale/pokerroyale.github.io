	function enable(item){ item.removeClass("disabled"); }
	function disable(item){ item.addClass("disabled"); }
	function activate(item){ item.addClass("active"); }
	function deactivate(item){ item.removeClass("active"); }
	
	const points = new Array();
	const multi = new Array();
	const inc_points = new Array();
	const inc_multi = new Array();
	
	points[1] = 5;		multi[1] = 1;		inc_points[1] = 10;		inc_multi[1] = 1;
	points[2] = 10;		multi[2] = 2;		inc_points[2] = 15;		inc_multi[2] = 1;
	points[3] = 20;		multi[3] = 2;		inc_points[3] = 20;		inc_multi[3] = 1;
	points[4] = 30;		multi[4] = 3;		inc_points[4] = 20;		inc_multi[4] = 2;
	points[5] = 30;		multi[5] = 4;		inc_points[5] = 25;		inc_multi[5] = 2;	// 30
	points[6] = 35;		multi[6] = 4;		inc_points[6] = 25;		inc_multi[6] = 2;	// 15
	points[7] = 40;		multi[7] = 4;		inc_points[7] = 30;		inc_multi[7] = 2;	// 15
	points[8] = 60;		multi[8] = 7;		inc_points[8] = 30;		inc_multi[8] = 3;
	points[9] = 100;	multi[9] = 8;		inc_points[9] = 40;		inc_multi[9] = 3;
	points[10] = 120;	multi[10] = 12;		inc_points[10] = 35;	inc_multi[10] = 3;
	points[11] = 140;	multi[11] = 14;		inc_points[11] = 40;	inc_multi[11] = 3;
	points[12] = 160;	multi[12] = 16;		inc_points[12] = 40;	inc_multi[12] = 3;
	
	var level = new Array();
	var plays = new Array();
	var current_play, current_score;
	var max_plays, max_discards;
	var plays_left, discards_left;
	var round, blind, goal;
	var played_plays, not_played_plays;
	var played_discards, not_played_discards;
	var defeated_blinds, not_defeated_blinds;
	var increased_levels;
	var cards;
	var dice;
	var tokens;
	var score;
	var suddeath;
	var nofigures, balanced;
	var boss = "none";						// "none" / "big_boss" / "half_base" / "level_down" / unique_hand / varied_hands
	var timeout = 0;
	var delay = 1500;
	
	function load_game(){
//			var cookie = document.cookie;
		
		//var cookie = document.cookie.replace(/(?:(?:^|.*;\s*)${"POKER_ROYALE"}\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		
//			if(cookie.length == 0) show_config();
//			SI HAY PARTIDA GUARDADA
//				VOLCAR DATOS DE PARTIDA DESDE LA COOKIE
//				Y MOSTRAR PANTALLA DE JUEGO
		//	alert(cookie.length);
		if(1 == 0){
		//
		//		CARGAR DATOS DESDE COOKIES
			current_play = new Array(); // BORRAR
			current_score = new Array(); // BORRAR
			max_plays = 4;			// BORRAR
			plays_left = max_plays;	// BORRAR
			max_discards = 3;		// BORRAR
			discards_left = max_discards;// BORRAR
			round = 1;			// BORRAR
			blind = 1;				// BORRAR
			goal = 300;				// BORRAR
			total_points = 0;		// BORRAR
			played_plays = 0;		// BORRAR
			not_played_plays = 0;	// BORRAR
			played_discards = 0;	// BORRAR
			not_played_discards = 0;// BORRAR
			defeated_blinds = 0;	// BORRAR
			not_defeated_blinds = 0;// BORRAR
			increased_levels = 0;	// BORRAR
			cards = 0				// BORRAR
			dice = 1;				// BORRAR
			tokens = 4;				// BORRAR
			score = 0;				// BORRAR
			suddeath = 6;			// BORRAR
			nofigures = false;		// BORRAR
			balanced = false;		// BORRAR
			
			$("#header_levels").prop("disabled", false);
			$("#header_game").prop("disabled", false);
			
			$("#savegame").prop("checked", true);
			
			show_game();
		}
		else{
			current_play = new Array();
			current_score = new Array();
			max_plays = 4;
			plays_left = max_plays;
			max_discards = 3;
			discards_left = max_discards;
			round = 1;
			blind = 1;
			goal = 300;
			played_plays = 0;
			not_played_plays = 0;
			played_discards = 0;
			not_played_discards = 0;
			defeated_blinds = 0;
			not_defeated_blinds = 0;
			increased_levels = 0;
			cards = 0;
			dice = 1;
			tokens = 4;
			score = 0;
			suddeath = 6;
			nofigures = $("#nofigures").is(":checked");
			balanced = $("#balanced").is(":checked");
			
			for(var i = 1; i <= 12; i++){
				level[i] = 1;
				plays[i] = 0;
			}
		}
		
		refresh();
		
		for(var i = 1; i <= 12; i++){
			$("#hand_" + i + " .plays").text(plays[i]);
			$("#hand_" + i + " .level").text(level[i]);
			if(level[i] == 1) disable($("#hand_" + i + " .button.down"));
			
			$("#hands_form #s_hand_" + i + " .level").text(level[i]);
			$("#hands_form #s_hand_" + i + " .plays").text(plays[i]);
		}
		
		$("#levels #max_plays .counter").text(max_plays);
		$("#levels #max_discards .counter").text(max_discards);
		$("#levels #tokens .counter").text(tokens);
		
		$("#levels #stats #played_plays").text(played_plays);
		$("#levels #stats #not_played_plays").text(not_played_plays);
		$("#levels #stats #played_discards").text(played_discards);
		$("#levels #stats #not_played_discards").text(not_played_plays);
		$("#levels #stats #defeated_blinds").text(defeated_blinds);
		$("#levels #stats #not_defeated_blinds").text(not_defeated_blinds);
		$("#levels #stats #added_cards").text(cards);
		$("#levels #stats #increased_levels").text(increased_levels);
		
		$("#game #game_header #round").html("Ronda " + round);
		refresh_game_header();
		$("#game #game_header #goal").html(goal.toLocaleString());
		
		$("#play #play_hand #sample").text("");
		$("#play #play_hand #label").text("");
		$("#play #play_hand #level").text("");
		$("#play #play_hand #plays").text("");
		$("#play #play_hand").addClass("empty");
		
		$("#game #play #play_points").text("0");
		$("#game #play #play_multi").text("0");
		$("#game #play #play_confirm").text("");
		
		disable($("#game #play #play_points"));
		disable($("#game #play #play_multi"));
		disable($("#game #play #play_reset"));
		enable($("#game #play #play_discard"));
		disable($("#game #play #play_confirm"));
		
		$("#game #game_footer #cards .counter").text((nofigures ? 40 : 52) + cards);
		$("#game #game_footer #discards_left .counter").text(discards_left);
		$("#game #game_footer #plays_left .counter").text(plays_left);
		enable($("#game #game_footer .button"));
		$("#hands_form #s_hand").val(0);
		
		$("#config #suddeath").text(suddeath);
		$("#config #nofigures").prop("checked", nofigures);
		$("#config #balanced").prop("checked", balanced);
	}
	
	function save_game(){
		if($("#savegame").prop("checked")){
		//	alert("Partida guardada.");
		}
		else{
		//	alert("Partida borrada.");
		}
//				var partida = new Array();
//				
//				const d = new Date();
//				d.setTime(d.getTime() + (exdays*24*60*60*1000));
//				let expires = "expires="+ d.toUTCString();
//				document.cookie = "poker_royale=" + cvalue + ";" + expires + ";path=/";
//			}
	}
	
	function new_game(){
		if((played_plays) || (played_discards)){
			if(confirm("Esto borrará la partida en curso. ¿Continuar?")){
				//
				//	PRIMERO: BORRAR COOKIES
				//
				$("#game #game_header").removeClass("suddeath");
				$("#game #played").text("");
				
				if(suddeath > 1) enable($("#config .button.down"));
				if(suddeath < 12) enable($("#config .button.up"));
				$("#config #nofigures").prop("disabled", false);
				$("#config #balanced").prop("disabled", false);
			}
		}
		else{
			$("#game #hands_form").addClass("hidden");
			$("#game #points_form").addClass("hidden");
			$("#game #multi_form").addClass("hidden");
			$("#game #dice_form").addClass("hidden");
			
			$("#header_levels").prop("disabled", false);
			$("#header_game").prop("disabled", false);
			show_game();
		}
		
		load_game();
		save_game();
	}
	
	function show_levels(){
		if(!$("#header_levels").is(":disabled")){
			$("#header_levels").prop("checked", true);
			$("#main").animate({ left: "200%" }, 200);
		}
	}
	
	function show_game(){
		if(!$("#header_game").is(":disabled")){
			$("#header_game").prop("checked", true);
			$("#main").animate({ left: "100%" }, 200);
		}
	}
	
	function show_config(){
		$("#header_config").prop("checked", true);
		$("#main").animate({ left: "0" }, 200);
	}
	
	function refresh(){
		deactivate($(".active"));
		
		for(var i = 1; i <= 12; i++){
			$("#hand_" + i + " .points").text(points[i] + inc_points[i] * (level[i] - 1));
			$("#hand_" + i + " .multi").text(multi[i] + inc_multi[i] * (level[i] - 1));
			
			$("#s_hand_" + i + " .points").text((boss == "half_base") ? (points[i] + inc_points[i] * (level[i] - 1)) / 2 : points[i] + inc_points[i] * (level[i] - 1).toLocaleString());
			$("#s_hand_" + i + " .multi").text((boss == "half_base") ? (multi[i] + inc_multi[i] * (level[i] - 1)) / 2 : multi[i] + inc_multi[i] * (level[i] - 1).toLocaleString());
		}
		
		if(parseInt($("#s_hand").val())){
			
			if(balanced){
				$("#play_points").text(get_points().toLocaleString());
				$("#play_multi").text(get_multi().toLocaleString());
				$("#play_confirm").text((get_points() * get_multi()).toLocaleString());
			}
		}
	}
	
	function refresh_game_header(){
		switch(blind - (3 * (round - 1))){
			case 1:
				$("#game #game_header").attr("class", "small_blind");
				$("#game #game_header #blind").html("Ciega PEQUEÑA");
				break;
			case 2:
				$("#game #game_header").attr("class", "big_blind");
				$("#game #game_header #blind").html("Ciega GRANDE");
				break;
			case 3:
				$("#game #game_header").attr("class", "boss_blind");
				$("#game #game_header #blind").html("Ciega JEFE");
				break;
			default: break;
		}
	}
	
	function change_boss(){
		if(blind - (3 * (round - 1)) == 3){
			clearTimeout(timeout);
			if(!$("#game #game_header").hasClass("active")){
				refresh();
			
			}
		}
	}
	
	function change_level(hand, inc){
		clearTimeout(timeout);
		if((!$("#hand_" + hand).hasClass("active")) || (!inc)){
			refresh();
			
			activate($("#hand_" + hand));
			$("#hand_" + hand + " .points").html(((level[hand] > 1) ? "&plusmn; " : "+ ") + inc_points[hand]);
			$("#hand_" + hand + " .multi").html(((level[hand] > 1) ? "&plusmn; " : "+ ") + inc_multi[hand]);
			
			timeout = setTimeout(function(){ refresh(); }, delay);
		}
		else if((inc > 0) || (level[hand] > 1)){
			level[hand] += inc;
			increased_levels += inc;
			
			if(level[hand] == 1) disable($("#hand_" + hand + " .button.down"));
			else enable($("#hand_" + hand + " .button.down"));
			
			$("#hand_" + hand).removeAttr("onClick");
			
			$("#hand_" + hand + " .level").text(level[hand]);
			$("#s_hand_" + hand + " .level").text(level[hand]);
			$("#stats #increased_levels").text(increased_levels);
			
			refresh();
			
			if(hand == parseInt($("#s_hand").val())){
				$("#play #play_hand #level").text(level[hand]);
				
				var search;
				
				search = (inc > 0) ? points[hand] + inc_points[hand] * (level[hand] - 2) : points[hand] + inc_points[hand] * level[hand];
				if(boss == "half_base") search = search / 2;
				$("#points_string").text($("#points_string").text().replace(search, (boss == "half_base") ? (points[hand] + inc_points[hand] * (level[hand] - 1)) / 2 : points[hand] + inc_points[hand] * (level[hand] - 1)));
				points_add(0);
				
				search = (inc > 0) ? multi[hand] + inc_multi[hand] * (level[hand] - 2) : multi[hand] + inc_multi[hand] * level[hand];
				if(boss == "half_base") search = search / 2;
				$("#multi_string").text($("#multi_string").text().replace(search, (boss == "half_base") ? (multi[hand] + inc_multi[hand] * (level[hand] - 1)) / 2 : multi[hand] + inc_multi[hand] * (level[hand] - 1)));
				multi_add(0);
			}
			
			setTimeout(function(){
				deactivate($("#hand_" + hand));
				$("#hand_" + hand).attr("onClick", "change_level(" + hand + ", 0);");
			}, 1);
			
			save_game();
		}
	}
	
	function change_max_plays(inc){
		clearTimeout(timeout);
		if(!$("#levels #max_plays").hasClass("active")){
			refresh();
			activate($("#levels #max_plays"));
		}
		else if((inc > 0) || (max_plays > 1)){
			max_plays += inc;
			if(max_plays == 1) disable($("#levels #max_plays .button.down"));
			else enable($("#levels #max_plays .button.down"));
			$("#levels #max_plays .counter").text(max_plays);
			
			if(plays_left){
				plays_left += inc;
				if(!plays_left){
					disable($("#game #play #play_confirm"));
					disable($("#game #game_footer #plays_left .button.down"));
				}
				else{
					enable($("#game #play #play_confirm"));
					enable($("#game #game_footer #plays_left .button.down"));
				}
				$("#game #game_footer #plays_left .counter").text(plays_left);
			}
		}
		
		timeout = setTimeout(function(){ deactivate($("#levels #max_plays")); }, delay);
		
		save_game();
	}
	
	function change_max_discards(inc){
		clearTimeout(timeout);
		if(!$("#levels #max_discards").hasClass("active")){
			refresh();
			activate($("#levels #max_discards"));
		}
		else if((inc > 0) || (max_discards > 1)){
			max_discards += inc;
			if(!max_discards) disable($("#levels #max_discards .button.down"));
			else enable($("#levels #max_discards .button.down"));
			$("#levels #max_discards .counter").text(max_discards);
			
			if(discards_left){
				discards_left += inc;
				if(!discards_left){
					disable($("#game #play #play_discard"));
					disable($("#game #game_footer #discards_left .button.down"));
				}
				else{
					enable($("#game #play #play_discard"));
					enable($("#game #game_footer #discards_left .button.down"));
				}
				$("#game #game_footer #discards_left .counter").text(discards_left);
			}
		}
		
		timeout = setTimeout(function(){ deactivate($("#levels #max_discards")); }, delay);
		
		save_game();
	}
	
	function change_tokens(inc){
		clearTimeout(timeout);
		if(!$("#levels #tokens").hasClass("active")){
			refresh();
			activate($("#levels #tokens"));
		}
		else{
			tokens += inc;
			$("#levels #tokens .counter").text(tokens);
			if(tokens < 0) $("#levels #tokens .counter").addClass("negative");
			else $("#levels #tokens .counter").removeClass("negative");
		}
		
		timeout = setTimeout(function(){ deactivate($("#levels #tokens")); }, delay);
		save_game();
	}
	
	function change_cards(inc){
		clearTimeout(timeout);
		if((!$("#game #game_footer #cards").hasClass("active")) || (!inc)){
			refresh();
			activate($("#game #game_footer #cards"));
			
			timeout = setTimeout(function(){ deactivate($("#game #game_footer #cards")); }, delay);
		}
		else if((inc > 0) || ((nofigures ? 40 : 52) + cards)){
			cards += inc;
			
			if(!(((nofigures) ? 40 : 52) + cards)) disable($("#game_footer #cards .button.down"));
			else enable($("#game_footer #cards .button.down"));
			
			$("#game_footer #cards").removeAttr("onClick");
			
			$("#game_footer #cards .counter").text((nofigures ? 40 : 52) + cards);
			$("#stats #added_cards").text(cards);
			
			deactivate($("#game_footer #cards"));
			setTimeout(function(){ $("#game #game_footer #cards").attr("onClick", "change_cards(0);"); }, 1);
			save_game();
		}
	}
	
	function change_plays(inc){
		clearTimeout(timeout);
		if((!$("#game_footer #plays_left").hasClass("active")) || (!inc)){
			refresh();
			activate($("#game_footer #plays_left"));
			
			timeout = setTimeout(function(){ deactivate($("#game_footer #plays_left")); }, delay);
		}
		else if((inc > 0) || (plays_left)){
			plays_left += inc;
			
			if(!plays_left){
				disable($("#game #play #play_confirm"));
				disable($("#game #game_footer #plays_left .button.down"));
				$("#game form").addClass("hidden");
			}
			else{
				if(parseInt($("#s_hand").val())) enable($("#game #play #play_confirm"));
				enable($("#game #game_footer #plays_left .button.down"));
				$("#game form").removeClass("hidden");
			}
			
			$("#game #game_footer #plays_left").removeAttr("onClick");
			$("#game #game_footer #plays_left .counter").text(plays_left);
			deactivate($("#game #game_footer #plays_left"));
			
			setTimeout(function(){ $("#game #game_footer #plays_left").attr("onClick", "change_plays(0);"); }, 1);
			save_game();
		}
	}
	
	function change_discards(inc){
		clearTimeout(timeout);
		if((!$("#game_footer #discards_left").hasClass("active")) || (!inc)){
			refresh();
			activate($("#game_footer #discards_left"));
			
			timeout = setTimeout(function(){ deactivate($("#game_footer #discards_left")); }, delay);
		}
		else if((inc > 0) || (discards_left)){
			discards_left += inc;
			
			if(!discards_left){
				disable($("#game #play #play_discard"));
				disable($("#game #game_footer #discards_left .button.down"));
			}
			else{
				enable($("#game #play #play_discard"));
				enable($("#game #game_footer #discards_left .button.down"));
			}
			
			$("#game #game_footer #discards_left").removeAttr("onClick");
			$("#game #game_footer #discards_left .counter").text(discards_left);
			deactivate($("#game #game_footer #discards_left"));
			
			setTimeout(function(){ $("#game #game_footer #discards_left").attr("onClick", "change_discards(0);"); }, 1);
			save_game();
		}
	}
	
	function change_suddeath(inc){
		if((!played_plays) && (!played_discards)){
			if(((inc < 0) && (suddeath > 1)) || ((inc > 0) && (suddeath < 12))) suddeath += inc;
			if((inc < 0) && (suddeath == 1)) disable($("#config .button.down"));
			else if ((inc > 0) && (suddeath == 12)) disable($("#config .button.up"));
			else{
				enable($("#config .button.down"));
				enable($("#config .button.up"));
			}
			
			$("#config #suddeath").text(suddeath);
		}
	}

	function next_blind(){
		blind++;
		round = Math.trunc((blind + 2) / 3);
		$("#game #game_header #round").html("Ronda " + round);
		
		var base_points = (suddeath >= round) ? 300 * (2 ** (round - 1)) : 300 * (2 ** (round - 1)) + 100 * (2 ** (round - 1) * round - 1) - 100 * (round - 1);
		goal = base_points * (0.5 * (blind - (3 * (round - 1)) + 1));
		
		refresh_game_header();
		
		if(suddeath >= round) $("#game #game_header #goal").text(goal.toLocaleString());
		else{
			$("#game #game_header").addClass("suddeath");
			$("#game #game_header #goal").html(goal.toLocaleString());
			
			disable($("#config #rounds_down"));
			disable($("#config #rounds_up"));
		}
		
		$("#game #played div").animate({ height: "0" }, 250);
		setTimeout(function(){ $("#game #played").html(""); }, 250);
		save_game();
	}
	
	function select_hand(hand){
		clearTimeout(timeout);
		refresh();
		if(hand != parseInt($("#s_hand").val())){
			$("#play #play_hand").removeClass("empty");
			switch(hand){
				case 1:
					$("#play #play_hand #label").text("Carta más alta");
					$("#play #play_hand #sample").html('<span class="black">&#127146;</span>');
					break;
				case 2:
					$("#play #play_hand #label").text("Pareja");
					$("#play #play_hand #sample").html('<span class="red">&#127173;</span><span class="black">&#127189;</span>');
					break;
				case 3:
					$("#play #play_hand #label").text("Doble pareja");
					$("#play #play_hand #sample").html('<span class="black">&#127145;</span><span class="red">&#127161;</span><span class="black">&#127188;</span><span class="red">&#127172;</span>');
					break;
				case 4:
					$("#play #play_hand #label").text("Trío");
					$("#play #play_hand #sample").html('<span class="red">&#127171;</span><span class="black">&#127139;</span><span class="red">&#127155;</span>');
					break;
				case 5:
					$("#play #play_hand #label").text("Escalera");
					$("#play #play_hand #sample").html('<span class="black">&#127190;</span><span class="red">&#127173;</span><span class="black">&#127140;</span><span class="red">&#127155;</span><span class="black">&#127186;</span>');
					break;
				case 6:
					$("#play #play_hand #label").text("Color");
					$("#play #play_hand #sample").html('<span class="red">&#127178;</span><span class="red">&#127175;</span><span class="red">&#127173;</span><span class="red">&#127171;</span><span class="red">&#127170;</span>');
					break;
				case 7:
					$("#play #play_hand #label").text("Full");
					$("#play #play_hand #sample").html('<span class="red">&#127175;</span><span class="black">&#127191;</span><span class="red">&#127159;</span><span class="black">&#127140;</span><span class="red">&#127156;</span>');
					break;
				case 8:
					$("#play #play_hand #label").text("Póker");
					$("#play #play_hand #sample").html('<span class="black">&#127137;</span><span class="red">&#127153;</span><span class="black">&#127185;</span><span class="red">&#127169;</span>');
					break;
				case 9:
					$("#play #play_hand #label").text("Esc. Col. / Real");
					$("#play #play_hand #sample").html('<span class="red">&#127153;</span><span class="red">&#127166;</span><span class="red">&#127165;</span><span class="red">&#127163;</span><span class="red">&#127162;</span>');
					break;
				case 10:
					$("#play #play_hand #label").text("Repóker");
					$("#play #play_hand #sample").html('<span class="black">&#127137;</span><span class="red">&#127153;</span><span class="black">&#127185;</span><span class="red">&#127169;</span><span class="black">&#127137;</span>');
					break;
				case 11:
					$("#play #play_hand #label").text("Full de Color");
					$("#play #play_hand #sample").html('<span class="red">&#127162;</span><span class="red">&#127162;</span><span class="red">&#127162;</span><span class="red">&#127156;</span><span class="red">&#127156;</span>');
					break;
				case 12:
					$("#play #play_hand #label").text("5 de Color");
					$("#play #play_hand #sample").html('<span class="black">&#127137;</span><span class="black">&#127137;</span><span class="black">&#127137;</span><span class="black">&#127137;</span><span class="black">&#127137;</span>');
					break;
				default: break;
			}
			
			$("#play #play_hand #level").text(level[hand]);
			$("#play #play_hand #plays").text(plays[hand] + " +1");
			
			$("#points_form #points_string").text((boss == "half_base") ? (points[hand] + inc_points[hand] * (level[hand] - 1)) / 2 : points[hand] + inc_points[hand] * (level[hand] - 1));
			$("#multi_form #multi_string").text((boss == "half_base") ? (multi[hand] + inc_multi[hand] * (level[hand] - 1)) / 2 : multi[hand] + inc_multi[hand] * (level[hand] - 1));


			points_add(0);
			multi_add(0);
			
			enable($("#play #play_points"));
			enable($("#play #play_multi"));
			enable($("#play #play_reset"));
			enable($("#play #play_confirm"));
			$("#play #play_confirm").removeClass("empty");
			
			$("#hands_form #s_hand").val(hand);
			save_game();
		}
		$("#hands_form").addClass("hidden");
	}
	
	function get_points(){ return(eval($("#points_string").text())); }
	function get_multi(){ return(eval($("#multi_string").text().replaceAll("x", "*"))); }
	function get_score(){ return(get_points() * get_multi()); }
	
	function points_add(inc){
		if(inc){
			clearTimeout(timeout);
			refresh();
			$("#points_string").append(" +" + inc);
		}
		$("#points_confirm").text(get_points().toLocaleString());
		
		$("#play_points").text($("#points_confirm").text());
		$("#play_confirm").text(get_score().toLocaleString());
	}
	
	function points_reset(){
		clearTimeout(timeout);
		if(!$("#points_reset").hasClass("active")){
			refresh();
			activate($("#points_reset"));
			
			timeout = setTimeout(function(){ deactivate($("#points_reset")); }, delay);
		}
		else{
			var p = points[parseInt($("#s_hand").val())] + inc_points[parseInt($("#s_hand").val())] * (level[parseInt($("#s_hand").val())] - 1);
			if(boss == "half_base") p = p / 2;
			
			$("#points_string").text(p.toLocaleString());
			$("#points_confirm").text(p.toLocaleString());
			
			$("#play_points").text(p.toLocaleString());
			$("#play_confirm").text(get_score().toLocaleString());
			
			deactivate($("#points_reset"));
		}
	}
		
	function multi_add(inc){
		if(inc){
			clearTimeout(timeout);
			refresh();
			$("#multi_string").append(" +" + inc);
		}
		$("#multi_confirm").text(get_multi().toLocaleString());
		
		$("#play_multi").text($("#multi_confirm").text());
		$("#play_confirm").text(get_score().toLocaleString());
	}
	
	function multi_plus(inc){
		clearTimeout(timeout);
		refresh();
		$("#multi_string").text("(" + $("#multi_string").text() + ") x" + inc);
		$("#multi_confirm").text(get_multi().toLocaleString());
		
		$("#play_multi").text($("#multi_confirm").text());
		$("#play_confirm").text(get_score().toLocaleString());
	}
	
	function multi_reset(){
		clearTimeout(timeout);
		if(!$("#multi_reset").hasClass("active")){
			refresh();
			activate($("#multi_reset"));
			
			timeout = setTimeout(function(){ deactivate($("#multi_reset")); }, delay);
		}
		else{
			var m = multi[parseInt($("#s_hand").val())] + inc_multi[parseInt($("#s_hand").val())] * (level[parseInt($("#s_hand").val())] - 1);
			if(boss == "half_base") m = m / 2;
			
			$("#multi_string").text(m.toLocaleString());
			$("#multi_confirm").text(m.toLocaleString());
			
			$("#play_multi").text(m.toLocaleString());
			$("#play_confirm").text(get_score().toLocaleString());
			
			deactivate($("#multi_reset"));
		}
	}
	
	function refresh_score(){
		if(!current_play[current_play.length - 1]){
			$("#game #played").append("<div class='discard'><span class='label'>Descarte</span><span class='score'></span></div>");
			$("#game #played .discard").animate({ height: "32px" }, 250);
			
			if(!discards_left) disable($("#play_discard"));
		}
		else{
			var label;
			switch(current_play[current_play.length - 1]){
				case 1: label = "Carta más alta"; break;
				case 2: label = "Pareja"; break;
				case 3: label = "Doble Pareja"; break;
				case 4: label = "Trío"; break;
				case 5: label = "Escalera"; break;
				case 6: label = "Color"; break;
				case 7: label = "Full"; break;
				case 8: label = "Póker"; break;
				case 9: label = "Escalera de Color / Real"; break;
				case 10: label = "Repóker"; break;
				case 11: label = "Full de Color"; break;
				case 12: label = "5 de Color"; break;
				default: break;
			}
			$("#game #played").append("<div class='play'><span class='label'>" + label + "</span><span class='score'>" + current_score[current_score.length - 1].toLocaleString() + "</span></div>");
			$("#game #played .play").animate({ height: "32px" }, 250);
			
			
			
			
			
			
			
		}
		disable($("#config .button"));
		$("#config #nofigures").prop("disabled", true);
		$("#config #balanced").prop("disabled", true);
	}
	
	function play_reset(){
		if(parseInt($('#s_hand').val())){
			clearTimeout(timeout);
			if(!$("#play #play_reset").hasClass("active")){
				refresh();
				activate($("#play #play_reset"));
				
				timeout = setTimeout(function(){ deactivate($("#play #play_reset")); }, delay);
			}
			else{
				$("#hands_form #s_hand").val(0);
				
				$("#play #play_hand #sample").text("");
				$("#play #play_hand #label").text("");
				$("#play #play_hand #level").text("");
				$("#play #play_hand #plays").text("");
				$("#play #play_hand").addClass("empty");
				
				$("#play #play_points").text(0);
				$("#play #play_multi").text(0);
				$("#play #play_confirm").text("");
				$("#play #play_confirm").addClass("empty");
				
				disable($("#play #play_points"));
				disable($("#play #play_multi"));
				disable($("#play #play_reset"));
				disable($("#play #play_confirm"));
				
				deactivate($("#play #play_reset"));
			}
		}
	}
	
	function play_discard(){
		if(discards_left > 0){
			clearTimeout(timeout);
			if(!$("#play #play_discard").hasClass("active")){
				refresh();
				activate($("#play #play_discard"));
				
				timeout = setTimeout(function(){ deactivate($("#play #play_discard")); }, delay);
			}
			else{
				current_play[current_play.length] = 0;
				current_score[current_score.length] = 0;
				played_discards++;
				discards_left--;
				
				refresh_score();
				$("#game_footer #discards_left .counter").text(discards_left);
				deactivate($("#play #play_discard"));
				save_game();
			}
		}
	}
	
	function play_confirm(){
		if((plays_left) && (parseInt($("#s_hand").val()))){
			clearTimeout(timeout);
			if(!$("#play #play_confirm").hasClass("active")){
				refresh();
				activate($("#play #play_confirm"));
				
				if(boss == "level_down"){
					var hand = parseInt($("#s_hand").val());
					if(level[hand] > 1){
						$("#play_hand #level").append(" -1");
						
						var search;

						search = points[hand] + inc_points[hand] * (level[hand] - 1);
						$("#points_string").text($("#points_string").text().replace(search, points[hand] + inc_points[hand] * (level[hand] - 2)));
						
						search = multi[hand] + inc_multi[hand] * (level[hand] - 1);
						$("#multi_string").text($("#multi_string").text().replace(search, multi[hand] + inc_multi[hand] * (level[hand] - 2)));
						
						points_add(0);
						multi_add(0);
					}
				}
				
				if(balanced){
					$("#play_points").text(((get_points() + get_multi()) / 2).toLocaleString());
					$("#play_multi").text(((get_points() + get_multi()) / 2).toLocaleString());
					
					$("#play_confirm").text((((get_points() + get_multi()) / 2) * ((get_points() + get_multi()) / 2)).toLocaleString());
				}
				
				timeout = setTimeout(function(){
					$("#play_hand #level").text(level[parseInt($("#s_hand").val())]);
					
					if(boss == "level_down"){
						search = points[hand] + inc_points[hand] * (level[hand] - 2);
						$("#points_string").text($("#points_string").text().replace(search, points[hand] + inc_points[hand] * (level[hand] - 1)));
						
						search = multi[hand] + inc_multi[hand] * (level[hand] - 2);
						$("#multi_string").text($("#multi_string").text().replace(search, multi[hand] + inc_multi[hand] * (level[hand] - 1)));
						
						points_add(0);
						multi_add(0);
					}
					
					refresh();
				}, delay);
			}
			else{
				current_play[current_play.length] = parseInt($("#s_hand").val());
				current_score[current_score.length] = get_score();
				played_plays++;
				plays_left--;
				
				if((boss == "level_down") && (level[parseInt($("#s_hand").val())] > 1)){
					activate($("#levels #hand_" + parseInt($("#s_hand").val())));
					change_level(parseInt($("#s_hand").val()), -1);
				}
				
				refresh_score();
				$("#game_footer #plays_left .counter").text(plays_left);
				activate($("#play_reset"));
				play_reset();
				
				save_game();
			}
		}
	}
	
	function change_dice(){
		if(!$("#game #dice_switch").hasClass("disabled")){
			if(!$("#game #dice_switch").hasClass("regular")){
				$("#game #die_1").before("<span id='die_0' class='die'>&#63;</span>");
				$("#game #dice_switch").addClass("regular");
			}
			else{
				$("#game #die_0").remove();
				$("#game #dice_switch").removeClass("regular");
			}
		}
	}
	
	function add_die(){
		refresh();
		$("#game #die_" + dice).removeAttr("onClick");
		$("#game #die_" + dice).removeClass("button");
		dice++;
		
		$("#game #die_" + (dice - 1)).after("<span id='die_" + dice + "' class='die die_" + (1 + Math.floor(Math.random() * 12)) + " button' onClick='remove_die();'></span>");
	}
	
	function remove_die(){
		if($("#game #die_" + dice).hasClass("button")){
			if(!$("#game #die_" + dice).hasClass("active")){
				clearTimeout(timeout);
				refresh();
				
				activate($("#game #die_" + dice));
				
				timeout = setTimeout(function(){ deactivate($("#game #die_" + dice)); }, delay);
			}
			else{
				$("#game #die_" + dice).remove();
				dice--;
				if(dice > 1){
					$("#game #die_" + dice).addClass("button");
					$("#game #die_" + dice).attr("onClick", "remove_die();");
				}
				
				save_game();
			}
		}
	}
	
	function roll_die(die, times){
		if(times){
			setTimeout(function(){
				if(die) $("#game #die_" + die).attr("class", "die die_" + (1 + Math.floor(Math.random() * 12)));
				else $("#game #die_0").text(Math.floor(Math.random() * 26));
				$("#game #die_" + die).addClass("rolling");
				roll_die(die, times - 1);
			}, 5 * (30 - times));
		}
		else $("#game #die_" + die).removeClass("rolling");
	}
	
	function roll_dice(){
		if(!$("#game #roll").hasClass("disabled")){
			clearTimeout(timeout);
			$("#game #die_" + dice).removeClass("button");
			$("#game #die_add").hide();
			disable($("#game #roll"));
			disable($("#game #dice_switch"));
			
			timeout = setTimeout(function(){
				if(dice > 1) $("#game #die_" + dice).addClass("button");
				$("#game #die_add").show();
				enable($("#game #roll"));
				enable($("#game #dice_switch"));
			}, 3000);
			
			if($("#game #die_0").length) roll_die(0, 15 + Math.floor(Math.random() * 16));
			else for(var i = 1; i <= dice; i++) roll_die(i, 15 + Math.floor(Math.random() * 16));
		}
	}
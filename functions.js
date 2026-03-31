	// &hearts;
	// &diams; 
	// &clubs;
	// &spades;
	// &#8634; // REESTABLECER
	// &#9635; // CUADRO CON PUNTICO DENTRO
	// &#9634; // CUADRO BLANCO CON ESQUINAS REDONDEADAS
	// &#9671; // DIAMANTE BLANCO
	// &#9672; // DIAMANTE BLANCO CON DIAMANTE NEGRO EN EL INTERIOR
	// &#9744; // CUADRO BLANCO
	// &#9745; // CUADRO BLANCO CON CHECK
	// &#9746; // CUADRO BLANCO CON X
	// &#9760; // CALAVERA CON HUESOS
	// &#128401; &#x1f591; MANO ABIERTA75269804G
	// &#10003;// CHECK FINO
	// &#10004;// CHECK GRUESO
	// &#10008;// DISCARD GRUESO
	// &#10025;// ESTRELLA CON BORDE REDONDEADO
	// &#10031;// ESTRELLA CHULA
	// &#9885; // ESTRELLA BLANCA CRUZADA
	// &#9856; &#x2680; // DADO 1
	// &#9857; &#x2681; // DADO 2
	// &#9858; &#x2682; // DADO 3
	// &#9859; &#x2683; // DADO 4
	// &#9860; &#x2684; // DADO 5
	// &#9861; &#x2685; // DADO 6
	// &#10227; // flecha relanzar
	// &#128472; reroll
	// &plusmn; SÍMBOLO MÁS/MENOS
	// &#128369; &#x1f571; CALAVERA CON HUESOS
	
	const points = new Array();
	const multi = new Array();
	const inc_points = new Array();
	const inc_multi = new Array();
	
	points[1] = 5;		multi[1] = 1;	inc_points[1] = 10;		inc_multi[1] = 1;
	points[2] = 10;		multi[2] = 2;	inc_points[2] = 15;		inc_multi[2] = 1;
	points[3] = 20;		multi[3] = 2;	inc_points[3] = 20;		inc_multi[3] = 1;
	points[4] = 30;		multi[4] = 3;	inc_points[4] = 20;		inc_multi[4] = 2;
	points[5] = 30;		multi[5] = 4;	inc_points[5] = 25;		inc_multi[5] = 2;	// 30
	points[6] = 35;		multi[6] = 4;	inc_points[6] = 25;		inc_multi[6] = 2;	// 15
	points[7] = 40;		multi[7] = 4;	inc_points[7] = 30;		inc_multi[7] = 2;	// 15
	points[8] = 60;		multi[8] = 7;	inc_points[8] = 30;		inc_multi[8] = 3;
	points[9] = 100;	multi[9] = 8;	inc_points[9] = 40;		inc_multi[9] = 3;
	points[10] = 120;	multi[10] = 12;	inc_points[10] = 35;	inc_multi[10] = 3;
	points[11] = 140;	multi[11] = 14;	inc_points[11] = 40;	inc_multi[11] = 3;
	points[12] = 160;	multi[12] = 16;	inc_points[12] = 40;	inc_multi[12] = 3;
	
	var level = new Array();
	var plays = new Array();
	var max_hands, max_discards;
	var hands_left, discards_left;
	var round, blind, goal, score;
	var played_hands, not_played_hands;
	var played_discards, not_played_discards;
	var defeated_blinds, not_defeated_blinds;
	var increased_levels;
	var cards;
	var dice;
	var tokens;
	var suddeath;
	var nofigures, balanced;
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
	
			max_hands = 4;			// BORRAR
			hands_left = max_hands;	// BORRAR
			max_discards = 3;		// BORRAR
			discards_left = max_discards;// BORRAR
			round = 1;			// BORRAR
			blind = 1;				// BORRAR
			goal = 300;				// BORRAR
			total_points = 0;		// BORRAR
			played_hands = 0;		// BORRAR
			not_played_hands = 0;	// BORRAR
			played_discards = 0;	// BORRAR
			not_played_discards = 0;// BORRAR
			defeated_blinds = 0;	// BORRAR
			not_defeated_blinds = 0;// BORRAR
			increased_levels = 0;	// BORRAR
			suddeath = 6;			// BORRAR
			nofigures = false;		// BORRAR
			balanced = false;		// BORRAR
			cards = 0				// BORRAR
			dice = 1;				// BORRAR
			tokens = 4;				// BORRAR
			
			$("#savegame").prop("checked", true);
			
			show_game();
		}
		else{
			max_hands = 4;
			hands_left = max_hands;
			max_discards = 3;
			discards_left = max_discards;
			round = 1;
			blind = 1;
			goal = 300;
			played_hands = 0;
			not_played_hands = 0;
			played_discards = 0;
			not_played_discards = 0;
			defeated_blinds = 0;
			not_defeated_blinds = 0;
			increased_levels = 0;
			suddeath = 6;
			nofigures = $("#nofigures").is(":checked");
			balanced = $("#balanced").is(":checked");
			cards = 0;
			dice = 1;
			tokens = 4;
			
			for(var i = 12; i >= 1; i--){
				level[i] = 1;
				plays[i] = 0;
			}
		}
		
		for(var i = 12; i >= 1; i--){
			$("#hand_" + i + " .plays").text(plays[i]);
			$("#hand_" + i + " .level").text(level[i]);
			if(level[i] == 1) $("#hand_" + i + " .button.down").addClass("disabled");
			$("#hand_" + i + " .points").text(points[i] + inc_points[i] * (level[i] - 1));
			$("#hand_" + i + " .multi").text(multi[i] + inc_multi[i] * (level[i] - 1));
			
			$("#hands_form #s_hand_" + i + " .points").text(points[i] + inc_points[i] * (level[i] - 1));
			$("#hands_form #s_hand_" + i + " .multi").text(multi[i] + inc_multi[i] * (level[i] - 1));
		}
		
		$("#levels #max_hands .counter").text(max_hands);
		$("#levels #max_discards .counter").text(max_discards);
		$("#levels #tokens .counter").text(tokens);
		
		$("#levels .stats #played_hands").text(played_hands);
		$("#levels .stats #not_played_hands").text(not_played_hands);
		$("#levels .stats #played_discards").text(played_discards);
		$("#levels .stats #not_played_discards").text(not_played_hands);
		$("#levels .stats #defeated_blinds").text(defeated_blinds);
		$("#levels .stats #not_defeated_blinds").text(not_defeated_blinds);
		$("#levels .stats #added_cards").text(cards);
		$("#levels .stats #increased_levels").text(increased_levels);
		
		$("#game #game_header #round").html("Ronda " + round);
		refresh_game_header();
		$("#game #game_header #goal").html("&#9672; " + goal + " &#9672;");
		
		$("#game #game_footer #cards .counter").text((nofigures ? 40 : 52) + cards);
		$("#game #game_footer #discards_left .counter").text(discards_left);
		$("#game #game_footer #hands_left .counter").text(hands_left);
		
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
		if((played_hands) || (played_discards)){
			if(confirm("Esto borrará la partida en curso. ¿Continuar?")){
				//
				//	PRIMERO: BORRAR COOKIES
				//
				$("#game #game_header").removeClass("suddeath");
				$("#game #played").text("");
				
				if(suddeath > 1) $("#config .button.down").removeClass("disabled");
				if(suddeath < 12) $("#config .button.up").removeClass("disabled");
				$("#config #nofigures").prop("disabled", false);
				$("#config #balanced").prop("disabled", false);
			}
		}
		else{
			$("#game #hands_form").addClass("hidden");
			$("#game #points_form").addClass("hidden");
			$("#game #multi_form").addClass("hidden");
			$("#game #dice_form").addClass("hidden");
			show_game();
		}
		
		load_game();
		save_game();
	}
	
	function show_levels(){
		$("#header_levels").prop("checked", true);
		$("#main").animate({ left: "200%" }, 200);
	}
	
	function show_game(){
		$("#header_game").prop("checked", true);
		$("#main").animate({ left: "100%" }, 200);
	}
	
	function show_config(){
		$("#header_config").prop("checked", true);
		$("#main").animate({ left: "0" }, 200);
	}
	
	function refresh(){
		$(".active").removeClass("active");
		
		for(var i = 1; i <= 12; i++){
			$("#hand_" + i + " .points").text(points[i] + inc_points[i] * (level[i] - 1));
			$("#hand_" + i + " .multi").text(multi[i] + inc_multi[i] * (level[i] - 1));
		}
	}
	
	function change_level(hand, inc){
		clearTimeout(timeout);
		if((!$("#hand_" + hand).hasClass("active")) || (!inc)){
			refresh();
			
			$("#hand_" + hand).addClass("active");
			$("#hand_" + hand + " .points").html(((level[hand] > 1) ? "&plusmn; " : "+ ") + inc_points[hand]);
			$("#hand_" + hand + " .multi").html(((level[hand] > 1) ? "&plusmn; " : "+ ") + inc_multi[hand]);
			
			timeout = setTimeout(function(){
				$("#hand_" + hand).removeClass("active");
				$("#hand_" + hand + " .points").text(points[hand] + inc_points[hand] * (level[hand] - 1));
				$("#hand_" + hand + " .multi").text(multi[hand] + inc_multi[hand] * (level[hand] - 1));
			}, delay);
		}
		else if((inc > 0) || (level[hand] > 1)){
			level[hand] += inc;
			increased_levels += inc;
			
			if(level[hand] == 1) $("#hand_" + hand + " .button.down").addClass("disabled");
			else $("#hand_" + hand + " .button.down").removeClass("disabled");
			
			$("#hand_" + hand).removeAttr("onClick");
			
			$("#hand_" + hand + " .level").text(level[hand]);
			$("#hand_" + hand + " .points").text(points[hand] + inc_points[hand] * (level[hand] - 1));
			$("#hand_" + hand + " .multi").text(multi[hand] + inc_multi[hand] * (level[hand] - 1));
			$("#increased_levels").text(increased_levels);
			
			timeout = setTimeout(function(){
			$("#hand_" + hand).removeClass("active");
				$("#hand_" + hand).attr("onClick", "change_level(" + hand + ", 0);");
			}, 1);
			
			save_game();
		}
	}
	
	function change_max_hands(inc){
		clearTimeout(timeout);
		if(!$("#levels #max_hands").hasClass("active")){
			refresh();
			$("#levels #max_hands").addClass("active");
		}
		else if((inc > 0) || (max_hands > 1)){
			max_hands += inc;
			if(max_hands == 1) $("#levels #max_hands .button.down").addClass("disabled");
			else $("#levels #max_hands .button.down").removeClass("disabled");
			$("#levels #max_hands .counter").text(max_hands);
			
			if(hands_left){
				hands_left += inc;
				if(!hands_left){
					$("#game #play #play_confirm").addClass("disabled");
					$("#game #game_footer #hands_left .button.down").addClass("disabled");
				}
				else{
					$("#game #play #play_confirm").removeClass("disabled");
					$("#game #game_footer #hands_left .button.down").removeClass("disabled");
				}
				$("#game #game_footer #hands_left .counter").text(hands_left);
			}
		}
		
		timeout = setTimeout(function(){
			$("#levels #max_hands").removeClass("active");
		}, delay);
		
		save_game();
	}
	
	function change_max_discards(inc){
		clearTimeout(timeout);
		if(!$("#levels #max_discards").hasClass("active")){
			refresh();
			$("#levels #max_discards").addClass("active");
		}
		else if((inc > 0) || (max_discards > 1)){
			max_discards += inc;
			if(max_discards == 1) $("#levels #max_discards .button.down").addClass("disabled");
			else $("#levels #max_discards .button.down").removeClass("disabled");
			$("#levels #max_discards .counter").text(max_discards);
			
			if(discards_left){
				discards_left += inc;
				if(!discards_left){
					$("#game #play #play_discard").addClass("disabled");
					$("#game #game_footer #discards_left .button.down").addClass("disabled");
				}
				else{
					$("#game #play #play_discard").removeClass("disabled");
					$("#game #game_footer #discards_left .button.down").removeClass("disabled");
				}
				$("#game #game_footer #discards_left .counter").text(discards_left);
			}
		}
		
		timeout = setTimeout(function(){
			$("#levels #max_discards").removeClass("active");
		}, delay);
		
		save_game();
	}
	
	function change_tokens(inc){
		clearTimeout(timeout);
		if(!$("#levels #tokens").hasClass("active")){
			refresh();
			$("#levels #tokens").addClass("active");
		}
		else{
			tokens += inc;
			$("#levels #tokens .counter").text(tokens);
			if(tokens < 0) $("#levels #tokens .counter").addClass("negative");
			else $("#levels #tokens .counter").removeClass("negative");
		}
		
		timeout = setTimeout(function(){
			$("#levels #tokens").removeClass("active");
		}, delay);
		
		save_game();
	}
	
	function refresh_game_header(){
		switch(blind - (3 * (round - 1))){
			case 1:	$("#game #game_header #blind").html("&#9734; Ciega PEQUEÑA"); break;
			case 2: $("#game #game_header #blind").html("&#9733; Ciega GRANDE"); break;
			case 3:	$("#game #game_header #blind").html("&#10029; Ciega <b>JEFE</b>"); break;
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
	
	function change_cards(inc){
		clearTimeout(timeout);
		if((!$("#game #game_footer #cards").hasClass("active")) || (!inc)){
			refresh();
			$("#game #game_footer #cards").addClass("active");
			
			timeout = setTimeout(function(){
				$("#game #game_footer #cards").removeClass("active");
			}, delay);
		}
		else if((inc > 0) || ((nofigures ? 40 : 52) + cards)){
			cards += inc;
			
			if(!(((nofigures) ? 40 : 52) + cards)) $("#game #game_footer #cards .button.down").addClass("disabled");
			else $("#game #game_footer #cards .button.down").removeClass("disabled");
			
			$("#game #game_footer #cards").removeAttr("onClick");
			
			$("#game #game_footer #cards .counter").text((nofigures ? 40 : 52) + cards);
			$("#levels #added_cards").text(cards);
			
			$("#game #game_footer #cards").removeClass("active");
			timeout = setTimeout(function(){
				$("#game #game_footer #cards").attr("onClick", "change_cards(0);");
			}, 1);
			save_game();
		}
	}
	
	function change_hands(inc){
		clearTimeout(timeout);
		if((!$("#game_footer #hands_left").hasClass("active")) || (!inc)){
			refresh();
			$("#game_footer #hands_left").addClass("active");
			
			timeout = setTimeout(function(){
				$("#game_footer #hands_left").removeClass("active");
			}, delay);
		}
		else if((inc > 0) || (hands_left)){
			hands_left += inc;
			
			if(!hands_left){
				$("#game #play #play_confirm").addClass("disabled");
				$("#game #game_footer #hands_left .button.down").addClass("disabled");
			}
			else{
				$("#game #play #play_confirm").removeClass("disabled");
				$("#game #game_footer #hands_left .button.down").removeClass("disabled");
			}
			
			$("#game #game_footer #hands_left").removeAttr("onClick");
			$("#game #game_footer #hands_left .counter").text(hands_left);
			$("#game #game_footer #hands_left").removeClass("active");
			
			timeout = setTimeout(function(){
				$("#game #game_footer #hands_left").attr("onClick", "change_hands(0);");
			}, 1);
			save_game();
		}
	}
	
	function change_discards(inc){
		clearTimeout(timeout);
		if((!$("#game_footer #discards_left").hasClass("active")) || (!inc)){
			refresh();
			$("#game_footer #discards_left").addClass("active");
			
			timeout = setTimeout(function(){
				$("#game_footer #discards_left").removeClass("active");
			}, delay);
		}
		else if((inc > 0) || (discards_left)){
			discards_left += inc;
			
			if(!discards_left){
				$("#game #play #play_discard").addClass("disabled");
				$("#game #game_footer #discards_left .button.down").addClass("disabled");
			}
			else{
				$("#game #play #play_discard").removeClass("disabled");
				$("#game #game_footer #discards_left .button.down").removeClass("disabled");
			}
			
			$("#game #game_footer #discards_left").removeAttr("onClick");
			$("#game #game_footer #discards_left .counter").text(discards_left);
			$("#game #game_footer #discards_left").removeClass("active");
			
			timeout = setTimeout(function(){
				$("#game #game_footer #discards_left").attr("onClick", "change_discards(0);");
			}, 1);
			save_game();
		}
	}
	
	function change_suddeath(inc){
		if((!played_hands) && (!played_discards)){
			if(((inc < 0) && (suddeath > 1)) || ((inc > 0) && (suddeath < 12))) suddeath += inc;
			if((inc < 0) && (suddeath == 1)) $("#config .button.down").addClass("disabled");
			else if ((inc > 0) && (suddeath == 12)) $("#config .button.up").addClass("disabled");
			else{
				$("#config .button.down").removeClass("disabled");
				$("#config .button.up").removeClass("disabled");
			}
			
			$("#config #suddeath").text(suddeath);
		}
	}

	function next_blind(){
		blind++;
		round = Math.trunc((blind + 2) / 3);
		$("#game #game_header #round").html("Ronda <b>" + round + "</b>");
		
		var base_points = (suddeath >= round) ? 300 * (2 ** (round - 1)) : 300 * (2 ** (round - 1)) + 100 * (2 ** (round - 1) * round - 1) - 100 * (round - 1);
		goal = base_points * (0.5 * (blind - (3 * (round - 1)) + 1));
		
		refresh_game_header();
		
		if(suddeath >= round) $("#game #game_header #goal").html("&#9672; " + goal + " &#9672;");
		else{
			$("#game #game_header").addClass("suddeath");
			$("#game #game_header #goal").html("&#9760; <b>" + goal + "</b> &#9760;");
			
			$("#config #rounds_down").addClass("disabled");
			$("#config #rounds_up").addClass("disabled");
		}
		
		$("#game #played div").animate({ height: "0" }, 250);
		setTimeout(function(){ $("#game #played").html(""); }, 250);
		
		save_game();
	}
	
	function new_play(play){
		
	}
	
	function save_play(play){
		
	}
	
	function select_hand(hand){
		
		$("#hands_form").addClass("hidden");
		save_game();
	}
	
	function open_points_form(play){
		
	}
	
	function open_multi_form(play){
		
	}
	
	function play_reset(){
		clearTimeout(timeout);
		if(!$("#play #play_reset").hasClass("active")){
			refresh();
			$("#play #play_reset").addClass("active");
			
			timeout = setTimeout(function(){
				$("#play #play_reset").removeClass("active");
			}, delay);
		}
		else{
			
			
			
			
			$("#play #play_reset").removeClass("active");
		}
	}
	
	function play_discard(){
		if(discards_left > 0){
			clearTimeout(timeout);
			if(!$("#play #play_discard").hasClass("active")){
				refresh();
				$("#play #play_discard").addClass("active");
				
				timeout = setTimeout(function(){
					$("#play #play_discard").removeClass("active");
				}, delay);
			}
			else{
				played_discards++;
				discards_left--;
				
				$("#game #played").append("<div class='discard'></div>");
				$("#game #played .discard").animate({ height: "18px" }, 250);
				
				$("#play #play_discard").removeClass("active");
				$("#game_footer #discards_left .counter").text(discards_left);
				if(!discards_left){
					$("#game #play #play_discard").addClass("disabled");
					$("#game_footer #discards_left .button.down").addClass("disabled");
				}
				$("#levels .stats #played_discards").text(played_discards);
				
				$("#config .button").addClass("disabled");
				$("#config #nofigures").prop("disabled", true);
				$("#config #balanced").prop("disabled", true);
				save_game();
			}
		}
	}
	
	function play_confirm(){
		clearTimeout(timeout);
		if(!$("#play #play_confirm").hasClass("active")){
			refresh();
			$("#play #play_confirm").addClass("active");
			
			timeout = setTimeout(function(){
				$("#play #play_confirm").removeClass("active");
			}, delay);
		}
		else{
			
			
			
			
			$("#play #play_confirm").removeClass("active");
		}
	
	}
	
	function change_dice(){
		if(!$("#game #dice_switch").hasClass("disabled")){
			if(!$("#game #dice_switch").hasClass("regular")){
				$("#game #die_1").before("<div id='die_0' class='die'>&#63;</div>");
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
		
		$("#game #die_" + (dice - 1)).after("<div id='die_" + dice + "' class='die die_" + (1 + Math.floor(Math.random() * 12)) + " button' onClick='remove_die();'></div>");
	}
	
	function remove_die(){
		if($("#game #die_" + dice).hasClass("button")){
			if(!$("#game #die_" + dice).hasClass("active")){
				clearTimeout(timeout);
				refresh();
				
				$("#game #die_" + dice).addClass("active");
				
				timeout = setTimeout(function(){
					$("#game #die_" + dice).removeClass("active");
				}, delay);
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
			$("#game #roll").addClass("disabled");
			$("#game #die_" + dice).removeClass("button");
			$("#game #die_add").remove();
			$("#game #dice_switch").addClass("disabled");
			
			timeout = setTimeout(function(){
				$("#game #roll").removeClass("disabled");
				if(dice > 1) $("#game #die_" + dice).addClass("button");
				$("#game #die_" + dice).after("<div id='die_add' class='die add' onClick='add_die();'></span>");
				$("#game #dice_switch").removeClass("disabled");
			}, 2500);
			
			if($("#game #die_0").length) roll_die(0, 10 + Math.floor(Math.random() * 20));
			else for(var i = 1; i <= dice; i++){
				roll_die(i, 10 + Math.floor(Math.random() * 20));
			}
		}
	}
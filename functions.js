	function enable(e){ e.removeClass("disabled"); }
	function disable(e){ e.addClass("disabled"); }
	function activate(e){ e.addClass("active"); }
	function deactivate(e){ e.removeClass("active"); }
	function deactivate_all(){ $(".active").removeClass("active"); }
	function hide(e){ e.addClass("hidden"); }
	function show(e){ e.removeClass("hidden"); }
	
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
	var tokens;
	var cards;
	var dice = 1;
	var played_plays, not_played_plays;
	var played_discards, not_played_discards;
	var defeated_blinds, not_defeated_blinds;
	var total_score;
	var suddeath = 6;
	var nofigures, balanced;
	var boss = "none";						// "none" / "big_boss" / "medium" / "depressing" / "repetitive" / "alternative" / "forbidden"
	var boss_action;
	var timeout = 0;
	var delay = 1500;
	
	
	function delete_game(){
		Cookies.remove("PokerRoyale_current_play");
		Cookies.remove("PokerRoyale_current_score");
		Cookies.remove("PokerRoyale_total_score");
		Cookies.remove("PokerRoyale_max_plays");
		Cookies.remove("PokerRoyale_plays_left");
		Cookies.remove("PokerRoyale_max_discards");
		Cookies.remove("PokerRoyale_discards_left");
		Cookies.remove("PokerRoyale_tokens");
		Cookies.remove("PokerRoyale_cards");
		Cookies.remove("PokerRoyale_blind");
		Cookies.remove("PokerRoyale_round");
		Cookies.remove("PokerRoyale_played_plays");
		Cookies.remove("PokerRoyale_not_played_plays");
		Cookies.remove("PokerRoyale_played_discards");
		Cookies.remove("PokerRoyale_not_played_discards");
		Cookies.remove("PokerRoyale_defeated_blinds");
		Cookies.remove("PokerRoyale_not_defeated_blinds");
		Cookies.remove("PokerRoyale_nofigures");
		Cookies.remove("PokerRoyale_balanced");
		Cookies.remove("PokerRoyale_suddeath");
		Cookies.remove("PokerRoyale_dice");
		Cookies.remove("PokerRoyale_boss");
		Cookies.remove("PokerRoyale_boss_action");
	}
	
	function load_game(){
		if(Cookies.get("PokerRoyale_total_score")){
			current_play = Cookies.get("PokerRoyale_current_play");
			console.log(current_play);
			current_score = Cookies.get("PokerRoyale_current_score");
			console.log(current_score);
			total_score = Cookies.get("PokerRoyale_total_score");
			console.log(total_score);
			max_plays = Cookies.get("PokerRoyale_max_plays");
			console.log(max_plays);
			plays_left = Cookies.get("PokerRoyale_plays_left");
			console.log(plays_left);
			max_discards = Cookies.get("PokerRoyale_max_discards");
			console.log(max_discards);
			discards_left = Cookies.get("PokerRoyale_discards_left");
			console.log(discards_left);
			tokens = Cookies.get("PokerRoyale_tokens");
			console.log(tokens);
			cards = Cookies.get("PokerRoyale_cards");
			console.log(cards);
			blind = Cookies.get("PokerRoyale_blind");
			console.log(blind);
			round = Cookies.get("PokerRoyale_round");
			console.log(round);
			played_plays = Cookies.get("PokerRoyale_played_plays");
			console.log(played_plays);
			not_played_plays = Cookies.get("PokerRoyale_not_played_plays");
			console.log(not_played_plays);
			played_discards = Cookies.get("PokerRoyale_played_discards");
			console.log(played_discards);
			not_played_discards = Cookies.get("PokerRoyale_not_played_discards");
			console.log(not_played_discards);
			defeated_blinds = Cookies.get("PokerRoyale_defeated_blinds");
			console.log(defeated_blinds);
			not_defeated_blinds = Cookies.get("PokerRoyale_not_defeated_blinds");
			console.log(not_defeated_blinds);
			nofigures = Cookies.get("PokerRoyale_nofigures");
			console.log(nofigures);
			balanced = Cookies.get("PokerRoyale_balanced");
			console.log(balanced);
			suddeath = Cookies.get("PokerRoyale_suddeath");
			console.log(suddeath);
			dice = Cookies.get("PokerRoyale_dice");
			console.log(dice);
			boss = Cookies.get("PokerRoyale_boss");
			console.log(boss);
			boss_action = Cookies.get("PokerRoyale_boss_action");
			console.log(boss_action);
			
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
			tokens = 4;
			cards = 0;
			round = 1;
			blind = 1;
			played_plays = 0;
			not_played_plays = 0;
			played_discards = 0;
			not_played_discards = 0;
			defeated_blinds = 0;
			not_defeated_blinds = 0;
			total_score = 0;
			nofigures = $("#nofigures").is(":checked");
			balanced = $("#balanced").is(":checked");
			
			for(var i = 1; i <= 12; i++){
				level[i] = 1;
				plays[i] = 0;
			}
		}
		
		refresh();
		refresh_game_header();
		
		$("#levels_footer #max_plays .counter").text(max_plays);
		$("#levels_footer #max_discards .counter").text(max_discards);
		$("#levels_footer #tokens .counter").text(tokens);
		
		for(var i = 0; i < current_play.length; i++){
			if(!current_play[i]) $("#game #played").append("<div class='discard'><span class='label'>Descarte</span><span class='score'></span></div>");
			else $("#game #played").append("<div class='play'><span class='label'>" + get_label(current_play[i]) + "</span><span class='score'>" + current_score[i].toLocaleString() + "</span></div>");
		}
		
		$("#play #play_hand #sample").text("");
		$("#play #play_hand #label").text("");
		$("#play #play_hand #level").text("");
		$("#play #play_hand #plays").text("");
		$("#play #play_hand").addClass("empty");
		
		$("#play #play_points").text("0");
		$("#play #play_multi").text("0");
		$("#play #play_confirm").text("");
		
		disable($("#play #play_points"));
		disable($("#play #play_multi"));
		disable($("#play #play_reset"));
		if(discards_left) enable($("#play #play_discard"));
		else disable($("#play #play_discard"));
		disable($("#play #play_confirm"));
		
		enable($("#game_footer .button"));
		$("#game_footer #cards .counter").text((nofigures ? 40 : 52) + cards);
		if(((nofigures) && (cards == -39)) || ((!nofigures) && (cards == -51))) disable($("#game_footer #cards .button.down"));
		$("#game_footer #discards_left .counter").text(discards_left);
		if(!discards_left) disable($("#game_footer #discards_left .button_down"));
		$("#game_footer #plays_left .counter").text(plays_left);
		if(!plays_left){
			disable($("#game_footer #plays_left .button_down"));
			hide("#play");
			$("#next_blind").addClass("button");
		}
		
		$("#hands_form #s_hand").val(0);
		
		$("#dice_form span").remove();
		$("#dice_form #roll").before("<span id='die_add' onClick='add_die();'>");
		for(var i = 1; i <= dice; i++) $("#dice_form #die_add").before("<span id='die_" + i + "' class='die_" + (1 + Math.floor(Math.random() * 12)) + "'></span>");
		if(dice > 1){
			$("#dice_form #die_" + dice).addClass("button");
			$("#dice_form #die_" + dice).attr("onClick", "remove_die();");
		}
		$("#dice_form #dice_switch").removeClass("regular");
		
		$("#config #suddeath").text(suddeath);
		$("#config #nofigures").prop("checked", nofigures);
		$("#config #balanced").prop("checked", balanced);
		
		if((!defeated_blind()) && (round > suddeath)) $("#next_blind").addClass("endgame");
	}
	
	function save_game(){
		if($("#savegame").prop("checked")){
			Cookies.set("PokerRoyale_current_play", current_play, { expires: 7 });
			Cookies.set("PokerRoyale_current_score", current_score, { expires: 7 });
			Cookies.set("PokerRoyale_total_score", total_score, { expires: 7 });
			Cookies.set("PokerRoyale_max_plays", max_plays, { expires: 7 });
			Cookies.set("PokerRoyale_plays_left", plays_left, { expires: 7 });
			Cookies.set("PokerRoyale_max_discards", max_discards, { expires: 7 });
			Cookies.set("PokerRoyale_discards_left", discards_left, { expires: 7 });
			Cookies.set("PokerRoyale_tokens", tokens, { expires: 7 });
			Cookies.set("PokerRoyale_cards", cards, { expires: 7 });
			Cookies.set("PokerRoyale_blind", blind, { expires: 7 });
			Cookies.set("PokerRoyale_round", round, { expires: 7 });
			Cookies.set("PokerRoyale_played_plays", played_plays, { expires: 7 });
			Cookies.set("PokerRoyale_not_played_plays", not_played_plays, { expires: 7 });
			Cookies.set("PokerRoyale_played_discards", played_discards, { expires: 7 });
			Cookies.set("PokerRoyale_not_played_discards", not_played_discards, { expires: 7 });
			Cookies.set("PokerRoyale_defeated_blinds", defeated_blinds, { expires: 7 });
			Cookies.set("PokerRoyale_not_defeated_blinds", not_defeated_blinds, { expires: 7 });
			Cookies.set("PokerRoyale_nofigures", nofigures, { expires: 7 });
			Cookies.set("PokerRoyale_balanced", balanced, { expires: 7 });
			Cookies.set("PokerRoyale_suddeath", suddeath, { expires: 7 });
			Cookies.set("PokerRoyale_dice", dice, { expires: 7 });
			Cookies.set("PokerRoyale_boss", boss, { expires: 7 });
			Cookies.set("PokerRoyale_boss_action", boss_action, { expires: 7 });
		}
		else delete_game();
	}
	
	function new_game(endgame = false){
		if((played_plays) || (played_discards)){
			if(!endgame) endgame = confirm("Esto borrará la partida en curso. ¿Continuar?");
			if(endgame){
				//
				//	PRIMERO: BORRAR COOKIES
				//
				$("#game #game_header").removeClass("suddeath");
				$("#game #played").text("");
				
				if(suddeath > 1) enable($("#config .button.down"));
				if(suddeath < 12) enable($("#config .button.up"));
				$("#config #nofigures").prop("disabled", false);
				$("#config #balanced").prop("disabled", false);
				
				$("#header_levels").prop("disabled", true);
				$("#header_game").prop("disabled", true);
				
				$("#next_blind").removeClass("button");
				
				load_game();
			}
		}
		else{
			hide($("#game #hands_form"));
			hide($("#game #points_form"));
			hide($("#game #multi_form"));
			hide($("#game #dice_form"));
			
			$("#header_levels").prop("disabled", false);
			$("#header_game").prop("disabled", false);
			show($("#game form"));
			$("#next_blind").removeClass("button");
			
			load_game();
			show_game();
		}
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
	//	boss = "repetitive";
		deactivate_all();
		
		var increased_levels = 0;
		
		for(var h = 1; h <= 12; h++){
			$("#hand_" + h + " .level").text(level[h]);
			$("#hand_" + h + " .plays").text(plays[h]);
			$("#hand_" + h + " .points").text(points[h] + inc_points[h] * (level[h] - 1));
			$("#hand_" + h + " .multi").text(multi[h] + inc_multi[h] * (level[h] - 1));
				
			$("#s_hand_" + h + " .level").text(level[h]);
			$("#s_hand_" + h + " .plays").text(plays[h]);
			$("#s_hand_" + h + " .points").text(points[h] + inc_points[h] * (level[h] - 1));
			$("#s_hand_" + h + " .multi").text(multi[h] + inc_multi[h] * (level[h] - 1));
			
			if(boss == "medium"){
				$("#s_hand_" + h + " .points").text(Math.floor((points[h] + inc_points[h] * (level[h] - 1)) / 2));
				$("#s_hand_" + h + " .multi").text(((multi[h] + inc_multi[h] * (level[h] - 1)) / 2 > 1) ? Math.floor((multi[h] + inc_multi[h] * (level[h] - 1)) / 2) : 1);
			}
			else if(boss == "depressing"){
				if(level[h] > 1){
					$("#s_hand_" + h + " .level").append(" -1");
					$("#s_hand_" + h + " .points").text(points[h] + inc_points[h] * (level[h] - 2));
					$("#s_hand_" + h + " .multi").text(multi[h] + inc_multi[h] * (level[h] - 2));
				}
			}
			else if(boss == "repetitive"){
				if(current_play.length){
					for(var i = 0; i <= current_play.length; i++) if(current_play[i] == h) break;
					if(i > current_play.length){
						$("#s_hand_" + h + " .points").text("0");
						$("#s_hand_" + h + " .multi").text("0");
					}
				}
			}
			else if(boss == "alternative"){
				if(current_play.length){
					for(var i = 0; i <= current_play.length; i++) if(current_play[i] == h) break;
					if(i <= current_play.length){
						$("#s_hand_" + h + " .points").text("0");
						$("#s_hand_" + h + " .multi").text("0");
					}
				}
			}
			
			increased_levels += level[h] - 1;
		}
		
		$("#stats #played_plays").text(played_plays);
		$("#stats #not_played_plays").text(not_played_plays);
		$("#stats #played_discards").text(played_discards);
		$("#stats #not_played_discards").text(not_played_discards);
		$("#stats #defeated_blinds").text(defeated_blinds);
		$("#stats #not_defeated_blinds").text(not_defeated_blinds);
		$("#stats #added_cards").text(cards);
		$("#stats #increased_levels").text(increased_levels);
	}
	
	function refresh_game_header(){
		round = Math.trunc((blind + 2) / 3);
		
		if(round <= suddeath) goal = 300 * (2 ** (round - 1));
		else{
			goal = 300 * (2 ** (suddeath - 1));
			for(var i = 1; i <= round - suddeath; i++) goal = goal * 2 + (200 * (2 ** (i - 1)));
		}
		
/*		if(round <= suddeath){
			goal = 300 * (2 ** (round - 1));
			for(var i = 1; i < round; i++) goal = goal * 2 + (200 * (2 ** (i - 1)));
		}
		else{
			goal = 300 * (2 ** (suddeath - 1));
			for(var i = 1; i <= round - suddeath; i++) goal = goal * 2 + (300 * (2 ** (i - 1)));
		}
*/		
		
		$("#game_header #round").html("Ronda " + round);

		switch(blind - (3 * (round - 1))){
			case 1:
				$("#game_header").attr("class", "small_blind");
				$("#game_header #blind").html("Ciega PEQUEÑA");
				boss = "none";
				break;
			case 2:
				$("#game_header").attr("class", "big_blind");
				$("#game_header #blind").html("Ciega GRANDE");
				goal *= 1.5;
				break;
			case 3:
				$("#game_header").attr("class", "boss_blind");
				$("#game_header #blind").html("Ciega JEFE");
				goal *= 2;
				if(!current_play.length){
					$("#game_header").addClass("button");
					$("#game_header").attr("onClick", "show($('#boss_form'));");
				}
				else{
					$("#game_header").removeAttr("onClick");
					$("#game_header").removeClass("button");
				}
				break;
			default: break;
		}
		if(round > suddeath) $("#game_header").addClass("suddeath");
		
		if(boss == "big_boss") goal *= 2;
		if(balanced) goal *= 2;
		
		$("#game_header #goal").text(goal.toLocaleString());
	}
	
	function refresh_score(original = false){
		var hand = parseInt($("#s_hand").val());
		
		if(!original){
			if((boss == "repetitive") && (current_play.length)){
				for(var i = 0; i <= current_play.length; i++) if(current_play[i] == hand) break;
				if(i > current_play.length){
					$("#play #play_points").text("0");
					$("#play #play_multi").text("0");
					$("#play #play_confirm").text("0");
				}
			}
			else if((boss == "alternative") && (current_play.length)){
				for(var i = 0; i <= current_play.length; i++) if(current_play[i] == hand) break;
				if(i <= current_play.length){
					$("#play #play_points").text("0");
					$("#play #play_multi").text("0");
					$("#play #play_confirm").text("0");
				}
			}
			
			if(balanced){
				$("#play_points").text(Math.floor((get_points() + get_multi()) / 2).toLocaleString());
				$("#play_multi").text(Math.floor((get_points() + get_multi()) / 2).toLocaleString());
				
				$("#play_confirm").text((Math.floor(((get_points() + get_multi())) / 2) ** 2).toLocaleString());
			}
		}
		else{
			refresh();
			points_add(0);
			multi_add(0);
		}
	}
	
	function change_boss(b){
		boss = b;
		// big_boss --> duplica la puntuación objetivo.
		// medium --> reduce a la mitad la puntuación base
		// depressing --> reduce un nivel la mano jugada
		// repetitive --> sólo se puede jugar un tipo de mano
		// alternative -- > las manos repetidas no puntúan
		// forbidden --> la/s mano/s más jugadas reducen las fichas a 0
		
		$("#played .warning").remove();
		var warning;
		switch(boss){
			case "big_boss":
				warning = "Duplica la puntuación objetivo.";
				break;
			case "medium":
				warning = "La puntuación base se reduce a la mitad.";
				break;
			case "depressing":
				warning = "Reduce el nivel de la mano jugada.";
				break;
			case "repetitive":
				warning = "Juega un solo tipo de mano.";
				break;
			case "alternative":
				warning = "Las manos repetidas no puntúan.";
				break;
			case "forbidden":
				var max = 0;
				for(var i = 1; i <= 12; i++) if(plays[i] > max){ max = plays[i]; boss_action = i; }
				switch(boss_action){
					case 1: warning = "una <span>Carta más alta</span>"; break;
					case 2: warning = "una <span>Pareja</span>"; break;
					case 3: warning = "una <span>Doble Pareja</span>"; break;
					case 4: warning = "un <span>Trío</span>"; break;
					case 5: warning = "una <span>Escalera</span>"; break;
					case 6: warning = "un <span>Color</span>"; break;
					case 7: warning = "un <span>Full</span>"; break;
					case 8: warning = "un <span>Póker</span>"; break;
					case 9: warning = "una <span>Esc. Color / Real</span>"; break;
					case 10: warning = "un <span>Repóker</span>"; break;
					case 11: warning = "un <span>Full de Color</span>"; break;
					case 12: warning = "un <span>5 de Color</span>"; break;
					default: break;
				}
				warning = "Jugar " + warning + " reduce las fichas a 0.";
				break;
			default:
				$("#played .warning").remove();
				break;
		}
		if(boss != "none") $("#played").append("<div class='warning hidden'>" + warning + "</div>");
		setTimeout(function(){ show($("#played .warning")); }, 0);
		
		refresh();
		refresh_game_header();
		
		save_game();
		hide($("#boss_form"));
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
			
			if(level[hand] == 1) disable($("#hand_" + hand + " .button.down"));
			else enable($("#hand_" + hand + " .button.down"));
			
			$("#hand_" + hand).removeAttr("onClick");
			
			refresh();
			
			if(hand == parseInt($("#s_hand").val())){
			//	$("#play #play_hand #level").text(level[hand]);
				
				var search;
				if(boss == "depressing"){
					if(level[hand] > 1) $("#play_hand #level").append(" -1");
					search = (inc > 0) ? points[hand] + inc_points[hand] * (level[hand] - 3) : points[hand] + inc_points[hand] * (level[hand] - 1);
					$("#points_form #points_string").text($("#points_string").text().replace(search, points[hand] + inc_points[hand] * (level[hand] - 2)));
					search = (inc > 0) ? multi[hand] + inc_multi[hand] * (level[hand] - 3) : multi[hand] + inc_multi[hand] * (level[hand] - 1);
					$("#multi_form #multi_string").text($("#multi_string").text().replace(search, multi[hand] + inc_multi[hand] * (level[hand] - 2)));
				}
				else if(boss == "medium"){
					search = (inc > 0) ? Math.floor((points[hand] + inc_points[hand] * (level[hand] - 2)) / 2) : Math.floor((points[hand] + inc_points[hand] * level[hand]) / 2);
					$("#points_form #points_string").text($("#points_string").text().replace(search, Math.floor((points[hand] + inc_points[hand] * (level[hand] - 1)) / 2)));
					alert(search + " - " + (Math.floor((points[hand] + inc_points[hand] * (level[hand] - 1)) / 2)));
					search = (inc > 0) ? Math.floor((points[hand] + inc_points[hand] * (level[hand] - 2)) / 2) : Math.floor((points[hand] + inc_points[hand] * level[hand]) / 2);
					$("#multi_form #multi_string").text($("#multi_string").text().replace(search, Math.floor((multi[hand] + inc_multi[hand] * (level[hand] - 1)) / 2)));
				}
				
				points_add(0);
				multi_add(0);
			}
			
			setTimeout(function(){ $("#hand_" + hand).attr("onClick", "change_level(" + hand + ", 0);"); }, 0);
			
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
					disable($("#play #play_confirm"));
					disable($("#game_footer #plays_left .button.down"));
				}
				else{
					enable($("#play #play_confirm"));
					enable($("#game_footer #plays_left .button.down"));
				}
				$("#game_footer #plays_left .counter").text(plays_left);
			}
			save_game();
		}
		timeout = setTimeout(function(){ deactivate($("#levels #max_plays")); }, delay);
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
			save_game();
		}
		timeout = setTimeout(function(){ deactivate($("#levels #max_discards")); }, delay);
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
			save_game();
		}
		timeout = setTimeout(function(){ deactivate($("#levels #tokens")); }, delay);
	}
	
	function change_cards(inc){
		clearTimeout(timeout);
		if((!$("#game_footer #cards").hasClass("active")) || (!inc)){
			refresh();
			activate($("#game_footer #cards"));
			
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
			setTimeout(function(){ $("#game_footer #cards").attr("onClick", "change_cards(0);"); }, 0);
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
				disable($("#play #play_discard"));
				disable($("#game_footer #discards_left .button.down"));
			}
			else{
				enable($("#play #play_discard"));
				enable($("#game_footer #discards_left .button.down"));
			}
			
			$("#game_footer #discards_left").removeAttr("onClick");
			$("#game_footer #discards_left .counter").text(discards_left);
			
			deactivate($("#game_footer #discards_left"));
			setTimeout(function(){ $("#game_footer #discards_left").attr("onClick", "change_discards(0);"); }, 0);
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
				disable($("#play #play_confirm"));
				disable($("#game_footer #plays_left .button.down"));
				hide($("#play"));
				$("#next_blind").addClass("button");
				if((!defeated_blind()) && (round > suddeath)) $("#next_blind").addClass("endgame");
			}
			else if(!defeated_blind()){
				if(parseInt($("#s_hand").val())) enable($("#play #play_confirm"));
				enable($("#game_footer #plays_left .button.down"));
				show($("#play"));
				$("#next_blind").removeClass("button endgame");
				hide($("#total_score"));
			}
			
			$("#game_footer #plays_left").removeAttr("onClick");
			$("#game_footer #plays_left .counter").text(plays_left);
			
			deactivate($("#game_footer #plays_left"));
			setTimeout(function(){ $("#game_footer #plays_left").attr("onClick", "change_plays(0);"); }, 0);
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
	
	function select_hand(hand){
		clearTimeout(timeout);
		refresh();
		if(hand != parseInt($("#s_hand").val())){
			$("#play #play_hand").removeClass("empty");
			switch(hand){
				case 1:
					$("#play #play_hand #label").text("Carta más alta");
					$("#play #play_hand #sample").css("background-image", "url('sample_1.png')");
					break;
				case 2:
					$("#play #play_hand #label").text("Pareja");
					$("#play #play_hand #sample").css("background-image", "url('sample_2.png')");
					break;
				case 3:
					$("#play #play_hand #label").text("Doble Pareja");
					$("#play #play_hand #sample").css("background-image", "url('sample_3.png')");
					break;
				case 4:
					$("#play #play_hand #label").text("Trío");
					$("#play #play_hand #sample").css("background-image", "url('sample_4.png')");
					break;
				case 5:
					$("#play #play_hand #label").text("Escalera");
					$("#play #play_hand #sample").css("background-image", "url('sample_5.png')");
					break;
				case 6:
					$("#play #play_hand #label").text("Color");
					$("#play #play_hand #sample").css("background-image", "url('sample_6.png')");
					break;
				case 7:
					$("#play #play_hand #label").text("Full");
					$("#play #play_hand #sample").css("background-image", "url('sample_7.png')");
					break;
				case 8:
					$("#play #play_hand #label").text("Póker");
					$("#play #play_hand #sample").css("background-image", "url('sample_8.png')");
					break;
				case 9:
					$("#play #play_hand #label").text("Esc. Color/Real");
					$("#play #play_hand #sample").css("background-image", "url('sample_9.png')");
					break;
				case 10:
					$("#play #play_hand #label").text("Repóker");
					$("#play #play_hand #sample").css("background-image", "url('sample_10.png')");
					break;
				case 11:
					$("#play #play_hand #label").text("Full de Color");
					$("#play #play_hand #sample").css("background-image", "url('sample_11.png')");
					break;
				case 12:
					$("#play #play_hand #label").text("5 de Color");
					$("#play #play_hand #sample").css("background-image", "url('sample_12.png')");
					break;
				default: break;
			}
			
			$("#play #play_hand #level").text(level[hand]);
			$("#play #play_hand #plays").text(plays[hand] + " +1");
			
			$("#points_form #points_string").text(points[hand] + inc_points[hand] * (level[hand] - 1));
			$("#multi_form #multi_string").text(multi[hand] + inc_multi[hand] * (level[hand] - 1));
			
			if((boss == "depressing") && (level[hand] > 1)){
				$("#play_hand #level").append(" -1");
				$("#points_form #points_string").text(points[hand] + inc_points[hand] * (level[hand] - 2));
				$("#multi_form #multi_string").text(multi[hand] + inc_multi[hand] * (level[hand] - 2));
			}
			else if(boss == "medium"){
				$("#points_form #points_string").text(Math.floor((points[hand] + inc_points[hand] * (level[hand] - 1)) / 2));
				$("#multi_form #multi_string").text(((multi[hand] + inc_multi[hand] * (level[hand] - 1)) / 2 > 1) ? Math.floor((multi[hand] + inc_multi[hand] * (level[hand] - 1)) / 2) : 1);
			}
			else if((boss == "repetitive") && (current_play.length)){
				for(var i = 0; i <= current_play.length; i++) if(current_play[i] == hand) break;
				if(i > current_play.length){
					$("#points_form #points_string").text("0");
					$("#multi_form #multi_string").text("0");
				}
			}
			else if((boss == "alternative") && (current_play.length)){
				for(var i = 0; i <= current_play.length; i++) if(current_play[i] == hand) break;
				if(i <= current_play.length){
					$("#points_form #points_string").text("0");
					$("#multi_form #multi_string").text("0");
				}
			}
			
			points_add(0);
			multi_add(0);
			
			enable($("#play #play_points"));
			enable($("#play #play_multi"));
			enable($("#play #play_reset"));
			enable($("#play #play_confirm"));
			$("#play #play_confirm").removeClass("empty");
			
			$("#hands_form #s_hand").val(hand);
			$("#play #play_confirm").attr("onClick", "play(" + hand + ");");
			save_game();
		}
		hide($("#hands_form"));
	}
	
	function get_label(hand, warning = false){
		var label;
		switch(hand){
			case 1: label = "Carta más alta"; if(warning) label = "una <span>" + label + "</span> "; break;
			case 2: label = "Pareja"; if(warning) label = "una <span>" + label + "</span> "; break;
			case 3: label = "Doble Pareja"; if(warning) label = "una <span>" + label + "</span> "; break;
			case 4: label = "Trío";if(warning) label = "un <span>" + label + "</span> "; break;
			case 5: label = "Escalera"; if(warning) label = "una <span>" + label + "</span> "; break;
			case 6: label = "Color"; if(warning) label = "un <span>" + label + "</span> "; break;
			case 7: label = "Full"; if(warning) label = "un <span>" + label + "</span> "; break;
			case 8: label = "Póker"; if(warning) label = "un <span>" + label + "</span> "; break;
			case 9: label = "Escalera de Color / Real"; if(warning) label = "una <span>" + label + "</span> "; break;
			case 10: label = "Repóker"; if(warning) label = "un <span>" + label + "</span> "; break;
			case 11: label = "Full de Color"; if(warning) label = "un <span>" + label + "</span> "; break;
			case 12: label = "5 de Color"; if(warning) label = "un <span>" + label + "</span> "; break;
			default: break;
		}
		return(label);
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
		$("#points_close").text(get_points().toLocaleString());
		
		$("#play_points").text($("#points_close").text());
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
			var hand = parseInt($("#s_hand").val());
			var string = $("#multi_form #multi_string").text();
			
			$("#s_hand").val(0);
			select_hand(hand);
			$("#multi_form #multi_string").text(string);
			$("#multi_form #multi_close").text(get_multi().toLocaleString());
			$("#play #play_multi").text(get_multi().toLocaleString());
			
			deactivate($("#points_reset"));
		}
	}
		
	function multi_add(inc){
		if(inc){
			clearTimeout(timeout);
			refresh();
			$("#multi_string").append(" +" + inc);
		}
		$("#multi_close").text(get_multi().toLocaleString());
		
		$("#play_multi").text($("#multi_close").text());
		$("#play_confirm").text(get_score().toLocaleString());
	}
	
	function multi_plus(inc){
		clearTimeout(timeout);
		refresh();
		$("#multi_string").text("(" + $("#multi_string").text() + ") x" + inc);
		$("#multi_close").text(get_multi().toLocaleString());
		
		$("#play_multi").text($("#multi_close").text());
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
			var hand = parseInt($("#s_hand").val());
			var string = $("#points_form #points_string").text();
			
			$("#s_hand").val(0);
			select_hand(hand);
			$("#points_form #points_string").text(string);
			$("#points_form #points_close").text(get_points().toLocaleString());
			$("#play #play_points").text(get_points().toLocaleString());
			
			deactivate($("#multi_reset"));
		}
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
				
				$("#play #play_hand #sample").css("background-image", "none");
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
				$("#play #play_confirm").removeAttr("onClick");
			}
		}
	}
	
	function play(hand){
		var played = false;
		
		if(!hand){
			if(discards_left){
				clearTimeout(timeout);
				if(!$("#play_discard").hasClass("active")){
					refresh();
					activate($("#play_discard"));
					timeout = setTimeout(function(){ deactivate($("#play_discard")); }, delay);
				}
				else{
					current_play[current_play.length] = 0;
					current_score[current_score.length] = 0;
					
					$("#game #played").append("<div class='discard hidden'><span class='label'>Descarte</span><span class='score'></span></div>");
					setTimeout(function(){ show($("#game #played div.discard")); }, 0);
					
					played_discards++;
					$("#stats #played_discards").text(played_discards);
					
					activate($("#discards_left"));
					change_discards(-1);
					
					played = true;
				}
			}
		}
		else if(plays_left){
			clearTimeout(timeout);
			if(!$("#play_confirm").hasClass("active")){
				deactivate_all();
				refresh_score();
				activate($("#play_confirm"));
				
				timeout = setTimeout(function(){
					deactivate($("#play_confirm"));
					refresh_score(true);
				}, delay);
			}
			else{
				plays[hand]++;
				$("#levels #hand_" + hand + " .plays").text(plays[hand]);
				
				current_score[current_score.length] = balanced ? Math.floor((get_points() + get_multi()) / 2) ** 2 : get_score();
				
				if(boss == "depressing"){
					activate($("#levels #hand_" + hand));
					change_level(hand, -1);
				}
				else if((boss == "alternative") && (current_play.length)){
					for(var i = 0; i <= current_play.length; i++) if(current_play[i] == hand) break;
					if(i <= current_play.length) current_score[current_score.length - 1] = 0;
				}
				else if((boss == "repetitive") && (current_play.length)){
					for(var i = 0; i <= current_play.length; i++) if(current_play[i] == hand) break;
					if(i > current_play.length) current_score[current_score.length - 1] = 0;
				}
				else if((boss == "forbidden") && (tokens > 0)){
					tokens = 0;
					$("#levels #tokens .counter").text(0);
				}
				
				total_score += current_score[current_score.length - 1];
				
				current_play[current_play.length] = hand;
				
				$("#game #played").append("<div class='play hidden'><span class='label'>" + get_label(hand) + "</span><span class='score'>" + current_score[current_score.length - 1].toLocaleString() + "</span></div>");
				setTimeout(function(){ show($("#game #played div.play")); }, 0);
				
				played_plays++;
				$("#stats #played_plays").text(played_plays);
				
				activate($("#play_reset"));
				play_reset();
				
				activate($("#plays_left"));
				change_plays(-1);
				
				played = true;
				
				if(defeated_blind()){
					hide($("#game form"));
					$("#next_blind").addClass("button");
				}
				else if(!plays_left){
					$("#next_blind").addClass("button");
					if((!defeated_blind()) && (round > suddeath)) $("#next_blind").addClass("endgame");
				}
			}
		}
		
		if(played){
			refresh();
			refresh_game_header();
			$("#total_score span").text(total_score.toLocaleString());
			disable($("#config .button"));
			$("#config #nofigures").prop("disabled", true);
			$("#config #balanced").prop("disabled", true);
			save_game();
		}
	}
	
	function defeated_blind(){
		var score = 0;
		for(var i = 0; i < current_score.length; i++) score += current_score[i];
		$("#next_blind span").text(score.toLocaleString());
		return(score >= goal);
	}
	
	function next_blind(){
		if($("#next_blind").hasClass("button")){
			clearTimeout(timeout);
			if(!$("#next_blind").hasClass("active")){
				deactivate_all()
				activate($("#next_blind"));
				show($("#total_score"));
				
				timeout = setTimeout(function(){ deactivate($("#next_blind")); }, delay);
			}
			else if((!defeated_blind()) && (round > suddeath)){
				new_game(true);
				show_config();
			}
			else{
				not_played_plays += plays_left;
				not_played_discards += discards_left;
				if(defeated_blind()) defeated_blinds++;
				else not_defeated_blinds++;
				
				blind++;
				current_play = new Array();
				current_score = new Array();
				
				refresh();
				refresh_game_header();
				
				hide($("#game #played div"));
				setTimeout(function(){ $("#game #played").html(""); }, 200);
				
				show($("#game form"));
				deactivate($("#next_blind"));
				$("#next_blind").removeClass("button");
				$("#next_blind span").text(0);
				hide($("#total_score"));
				
				plays_left = max_plays;
				discards_left = max_discards;
				$("#game_footer #discards_left .counter").text(discards_left);
				$("#game_footer #plays_left .counter").text(plays_left);
				if(discards_left) enable($("#game_footer #discards_left .button.down"));
				else disable($("#game_footer #discards_left .button.down"));
				if(plays_left) enable($("#game_footer #plays_left .button.down"));
				
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
		$("#dice_form #die_" + dice).removeAttr("onClick");
		$("#dice_form #die_" + dice).removeClass("button");
		dice++;
		
		$("#dice_form #die_add").before("<span id='die_" + dice + "' class='die_" + (1 + Math.floor(Math.random() * 12)) + " button' onClick='remove_die();'></span>");
	}
	
	function remove_die(){
		if($("#game #die_" + dice).hasClass("button")){
			if(!$("#game #die_" + dice).hasClass("active")){
				clearTimeout(timeout);
				deactivate_all();
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
				if(die) $("#game #die_" + die).attr("class", "die_" + (1 + Math.floor(Math.random() * 12)));
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
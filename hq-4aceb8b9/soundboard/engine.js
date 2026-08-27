var HelthyEngine = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/utils/scoring/_sb-entry.ts
  var sb_entry_exports = {};
  __export(sb_entry_exports, {
    DEFAULT_RULESET: () => DEFAULT_RULESET,
    ENGINE_VERSION: () => ENGINE_VERSION,
    hasArtificialSweetenersIngredient: () => hasArtificialSweetenersIngredient,
    hasRefinedGrainsIngredient: () => hasRefinedGrainsIngredient,
    hasUltraprocessedRedIngredient: () => hasUltraprocessedRedIngredient,
    scoreDiabetes: () => scoreDiabetes,
    scoreDiabetesDetailed: () => scoreDiabetesDetailed
  });

  // src/utils/ingredientLists.ts
  var refinedGrainsList = [
    "enriched wheat flour",
    "white flour",
    "bleached flour",
    "unbleached flour",
    "wheat flour",
    "rice flour",
    "semolina",
    "durum wheat",
    "degermed cornmeal",
    "farina",
    "cake flour",
    "pastry flour",
    "enriched cornmeal",
    "polished rice",
    "instant rice",
    "self-rising flour",
    "quick grits",
    "modified food starch",
    "enriched barley flour",
    "hominy",
    "enriched macaroni",
    "instant noodles"
  ];
  var wholeGrainsList = [
    "whole wheat flour",
    "whole grain wheat",
    "brown rice",
    "brown rice flour",
    "oatmeal",
    "rolled oats",
    "steel-cut oats",
    "quinoa",
    "buckwheat flour",
    "millet",
    "sorghum",
    "whole cornmeal",
    "barley",
    "bulgur",
    "farro",
    "teff",
    "spelt",
    "kamut",
    "rye",
    "triticale",
    "wild rice",
    "freekeh",
    "amaranth",
    "sprouted whole grains",
    "einkorn",
    "chia seeds",
    "wheat berries"
  ];
  var artificialSweeteners = [
    "aspartame",
    "sucralose",
    "saccharin",
    "acesulfame",
    "acesulfame-k",
    "advantame",
    "neotame",
    "cyclamate",
    "alitame",
    "steviol glycosides",
    "stevia",
    "monk fruit",
    "monk fruit extract",
    "sugar alcohol",
    "xylitol",
    "sorbitol",
    "mannitol",
    "maltitol",
    "erythritol",
    "allulose",
    "tagatose",
    "isomalt",
    "thaumatin"
  ];
  var ultraprocessedIngredients = [
    // Emulsifiers
    "lecithin",
    "mono and diglycerides",
    "polysorbate",
    "sorbitan",
    "carrageenan",
    // Stabilizers and thickeners
    "guar gum",
    "xanthan gum",
    "gum arabic",
    "cellulose gum",
    "carboxymethylcellulose",
    "methylcellulose",
    "hydroxypropyl methylcellulose",
    "gellan gum",
    "locust bean gum",
    "tragacanth gum",
    "acacia gum",
    "tara gum",
    "gellen",
    // Preservatives
    "sodium benzoate",
    "potassium sorbate",
    "calcium propionate",
    "sodium nitrate",
    "sodium nitrite",
    "bha",
    "bht",
    "tbhq",
    "edta",
    "propyl gallate",
    "sorbic acid",
    "benzoic acid",
    "sodium erythorbate",
    "calcium disodium edta",
    // Artificial flavors and enhancers
    "artificial flavor",
    "artificial flavour",
    "natural flavor",
    "natural flavour",
    "monosodium glutamate",
    "msg",
    "disodium inosinate",
    "disodium guanylate",
    "yeast extract",
    "hydrolyzed",
    "autolyzed",
    "flavoring",
    "flavouring",
    // Colorings
    "yellow 5",
    "yellow 6",
    "red 40",
    "blue 1",
    "blue 2",
    "green 3",
    "caramel color",
    "caramel coloring",
    "titanium dioxide",
    "fd&c",
    "tartrazine",
    "sunset yellow",
    "allura red",
    "brilliant blue",
    // Modified ingredients
    "modified starch",
    "modified food starch",
    "hydrolyzed protein",
    "hydrolyzed vegetable protein",
    "textured vegetable protein",
    "soy protein isolate",
    "whey protein isolate",
    "protein isolate",
    "maltodextrin",
    // Other additives
    "high fructose corn syrup",
    "corn syrup solids",
    "dextrose",
    "glucose syrup",
    "invert sugar",
    "partially hydrogenated",
    "hydrogenated",
    "interesterified",
    "calcium sulfate",
    "ammonium sulfate",
    "sodium phosphate",
    "sodium acid pyrophosphate",
    "sodium aluminum phosphate",
    "aluminum",
    "glycerin",
    "propylene glycol"
  ];
  var hasRefinedGrainsIngredient = (ingredients) => {
    return ingredients.some((ingredient) => {
      const lowerIngredient = ingredient.toLowerCase();
      if (lowerIngredient.includes("buckwheat flour")) return false;
      return refinedGrainsList.some((refinedGrain) => {
        if (refinedGrain.includes("wheat flour") && lowerIngredient.includes("whole wheat flour")) {
          return false;
        }
        if (refinedGrain === "flour" && (lowerIngredient.includes("buckwheat flour") || lowerIngredient.includes("coconut flour") || lowerIngredient.includes("almond flour") || lowerIngredient.includes("chickpea flour"))) {
          return false;
        }
        return lowerIngredient.includes(refinedGrain) && // Make sure whole grain variants aren't caught
        !wholeGrainsList.some((wholeGrain) => lowerIngredient.includes(wholeGrain));
      });
    });
  };
  var hasArtificialSweetenersIngredient = (ingredients) => {
    return ingredients.some((ingredient) => {
      const lowerIngredient = ingredient.toLowerCase();
      return artificialSweeteners.some((sweetener) => lowerIngredient.includes(sweetener));
    });
  };
  var flavorPhraseRegex = /\b(natural|artificial)\s+(\w+(?:\s+\w+)?)\s+(flavou?rs?|flavou?ring)\b/i;
  var flavorStayRedDescriptors = [
    "smoke",
    "meat",
    "beef",
    "chicken",
    "bacon",
    "pork",
    "ham",
    "sausage",
    "turkey"
  ];
  var wholeFoodSignals = [
    // Forms
    "puree",
    "pur\xE9e",
    "juice",
    "pulp",
    "concentrate",
    // Fruits
    "apple",
    "orange",
    "mango",
    "strawberry",
    "raspberry",
    "blueberry",
    "blackberry",
    "banana",
    "pineapple",
    "peach",
    "pear",
    "cherry",
    "grape",
    "lemon",
    "lime",
    "coconut",
    "kiwi",
    "watermelon",
    "melon",
    "pomegranate",
    "passion fruit",
    "berry",
    "apricot",
    "plum",
    "fig",
    "date",
    // Vegetables
    "tomato",
    "carrot",
    "spinach",
    "kale",
    "beet",
    "pumpkin",
    "squash",
    "cucumber",
    "celery",
    // Dairy
    "milk",
    "cream",
    "butter",
    "yogurt",
    "cheese",
    // Other whole-food bases
    "cocoa",
    "cacao",
    "chocolate",
    "coffee",
    "tea",
    "vanilla",
    "mint",
    "ginger",
    "cinnamon",
    "honey",
    "maple"
  ];
  var ingredientSeverity = (ingredient, allIngredients) => {
    const lower = ingredient.toLowerCase();
    const m = lower.match(flavorPhraseRegex);
    if (m) {
      const kind = m[1].toLowerCase();
      const descriptor = m[2].toLowerCase();
      if (kind === "artificial") return "red";
      if (flavorStayRedDescriptors.some((t) => descriptor.includes(t))) return "red";
      const allText = allIngredients.join(" ").toLowerCase();
      const hasWholeFood = wholeFoodSignals.some((t) => allText.includes(t));
      return hasWholeFood ? "yellow" : "red";
    }
    if (ultraprocessedIngredients.some((u) => lower.includes(u))) return "red";
    return "none";
  };
  var hasUltraprocessedRedIngredient = (ingredients) => ingredients.some((i) => ingredientSeverity(i, ingredients) === "red");

  // src/utils/scoring/ruleset.ts
  var ENGINE_VERSION = "2.0.0";
  var DEFAULT_RULESET = {
    version: ENGINE_VERSION,
    axes: {
      sugar: { green: 5, yellow: 10, severe: 20 },
      sodium: { green: 140, yellow: 300, severe: 600 },
      satFat: { green: 1, yellow: 3, severe: 6 }
    },
    points: {
      knee: 8,
      // ⚖️
      red: 20,
      // ⚖️ (hard ceiling — see the 2k < red ≤ 20 calibration invariant)
      rampSevereAnchor: 20
      // LOCKED
    },
    satFat: {
      capPoints: 15,
      // ⚖️ the cheese dial
      density: { zeroBelowPct: 15, fullAbovePct: 20 },
      // LOCKED
      unconditionalAnchor: 2
      // ⚖️ (zeroable to 1 — the lean-fat window)
    },
    flags: {
      pointsEach: 3
      // ⚖️
    },
    credits: {
      fiber: {
        gramsPerGram: 0.5,
        // ⚖️
        capGrams: 3
        // LOCKED (holds the 8g green-eligible ceiling)
      }
    },
    transFat: {
      vetoAboveGrams: 0
      // LOCKED
    },
    dataQuality: {
      sugarContradictionCarbFloor: 8
      // LOCKED (g/100g)
    },
    epsilonGreen: 1e-9,
    // LOCKED
    greenGate: {
      maxGL: 20,
      // ⚖️
      sugarGI: 60,
      starchGI: { refined: 75, whole: 45, unknown: 60 },
      beverageSugarFormMult: 1.2,
      macroBluntMult: 0.85,
      wholeGrainTerms: [
        "whole grain",
        "whole wheat",
        "whole-wheat",
        "whole oat",
        "rolled oat",
        "steel cut",
        "steel-cut",
        "oatmeal",
        "brown rice",
        "quinoa",
        "barley",
        "bulgur",
        "buckwheat",
        "farro",
        "millet",
        "legume",
        "lentil",
        "chickpea",
        "garbanzo",
        "black bean",
        "kidney bean",
        "pinto",
        "navy bean",
        "split pea",
        "edamame",
        "soybean"
      ]
    },
    racc: {
      default: 55,
      minPlausibleServing: 30,
      maxPlausibleServing: 400
    },
    reviewLane: {
      lactoseSugarFactor: 0.6
      // ⚖️ (draft — pending Nora)
    },
    terms: {
      // RETAINED for inference only (checkDataQuality reads it — §2.1 note); its SCORING role is
      // dead in v2 (effective sugar = max(total, added), the only sugar-source rule — §2.3).
      addedSugar: [
        "sugar",
        "brown sugar",
        "cane sugar",
        "high fructose corn syrup",
        "honey",
        "syrup",
        "dextrose",
        "fructose",
        "maltose",
        "molasses",
        "agave nectar",
        "glucose",
        "invert sugar",
        "corn syrup",
        "maple syrup",
        "coconut sugar",
        "rice syrup",
        "barley malt",
        "date syrup",
        "sucrose",
        "juice concentrate",
        "maltodextrin",
        "fruit juice",
        "evaporated cane juice"
      ]
    }
  };

  // src/utils/scoring/engine.ts
  var clampNonNeg = (x) => x === void 0 ? void 0 : Math.max(0, x);
  var hasAddedSugarIngredients = (ingredients, ruleset) => {
    const lowerIngredients = ingredients.map((ing) => ing.toLowerCase());
    return ruleset.terms.addedSugar.some(
      (term) => lowerIngredients.some((ing) => ing.includes(term))
    );
  };
  var checkDataQuality = (data, ruleset) => {
    const result = {
      isValid: true,
      missingFields: [],
      derivedFields: [],
      assumptions: []
    };
    data.addedSugar = clampNonNeg(data.addedSugar);
    data.totalSugar = clampNonNeg(data.totalSugar);
    data.sodium = clampNonNeg(data.sodium);
    data.transFat = clampNonNeg(data.transFat);
    data.saturatedFat = clampNonNeg(data.saturatedFat);
    data.calories = clampNonNeg(data.calories);
    data.protein = clampNonNeg(data.protein);
    data.carbs = clampNonNeg(data.carbs);
    data.fat = clampNonNeg(data.fat);
    data.fiber = clampNonNeg(data.fiber);
    let { calories, saturatedFat, sodium, transFat, addedSugar, totalSugar, protein, carbs, fat } = data;
    if (calories === void 0) {
      if (protein !== void 0 && carbs !== void 0 && fat !== void 0) {
        calories = protein * 4 + carbs * 4 + fat * 9;
        data.calories = calories;
        result.derivedFields.push("calories");
        result.assumptions.push(
          `Calories derived using Atwater formula: (protein \xD7 4) + (carbs \xD7 4) + (fat \xD7 9) = ${Math.round(calories)} kcal`
        );
      } else {
        result.missingFields.push("calories");
      }
    }
    if (saturatedFat === void 0) {
      data.saturatedFat = 0;
      result.derivedFields.push("saturatedFat");
      result.assumptions.push("Saturated fat not reported \u2014 defaulted to 0g");
    }
    if (transFat === void 0) {
      data.transFat = 0;
      result.derivedFields.push("transFat");
      result.assumptions.push("Trans fat not reported \u2014 defaulted to 0g");
    }
    if (sodium === void 0) result.missingFields.push("sodium");
    const hasAddedSugarData = addedSugar !== void 0;
    const hasTotalSugarData = totalSugar !== void 0;
    const hasIngredients = data.ingredients.length > 0 && data.ingredients[0] !== "Ingredients information unavailable";
    if (!hasAddedSugarData && !hasTotalSugarData) {
      result.missingFields.push("sugar data");
    } else if (hasAddedSugarData && addedSugar === 0 && !hasTotalSugarData) {
      result.missingFields.push("sugar data (added=0, total unreported)");
    } else if (!hasAddedSugarData && hasTotalSugarData && hasIngredients) {
      const hasAddedSugarIngredient = hasAddedSugarIngredients(data.ingredients, ruleset);
      data.addedSugar = totalSugar;
      result.assumptions.push(
        hasAddedSugarIngredient ? `Added sugar assumed equal to total sugar (${Math.round(totalSugar)}g) due to presence of added sugar ingredients` : `Sugar assumed to be naturally occurring (${Math.round(totalSugar)}g total)`
      );
    } else if (!hasAddedSugarData && hasTotalSugarData && !hasIngredients) {
      data.addedSugar = totalSugar;
      result.assumptions.push(
        `Using total sugar value (${Math.round(totalSugar)}g) - unable to determine if added or natural (no ingredient data)`
      );
    } else if (hasAddedSugarData && addedSugar === 0 && hasTotalSugarData && totalSugar > 0 && hasIngredients) {
      if (hasAddedSugarIngredients(data.ingredients, ruleset)) {
        data.addedSugar = totalSugar;
        result.assumptions.push(
          `Stored added sugar was 0g but ingredients contain added sugars (e.g., cane sugar, syrup) \u2014 overriding to total sugar (${Math.round(totalSugar)}g)`
        );
      }
    }
    if (hasAddedSugarData && addedSugar === 0 && hasTotalSugarData && totalSugar === 0 && hasIngredients && hasAddedSugarIngredients(data.ingredients, ruleset) && carbs !== void 0 && carbs >= ruleset.dataQuality.sugarContradictionCarbFloor) {
      result.missingFields.push("sugar data (contradiction: 0 reported but added-sugar ingredients + carbs)");
    }
    if (!hasIngredients) {
      if (data.novaGroup !== void 0 && data.novaGroup >= 4) {
        result.assumptions.push(`No ingredients available but NOVA group ${data.novaGroup} indicates ultra-processed food`);
      } else {
        result.assumptions.push(`Ingredients unavailable - scored based on nutritional data only`);
      }
    }
    if (result.missingFields.length > 0) {
      result.isValid = false;
    }
    return result;
  };
  var resolveRaccServing = (realServingWeight, flatDefault, ruleset) => {
    if (realServingWeight !== void 0 && realServingWeight > 0) {
      return Math.min(
        Math.max(realServingWeight, ruleset.racc.minPlausibleServing),
        ruleset.racc.maxPlausibleServing
      );
    }
    return flatDefault;
  };
  var clampGL = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
  var computeGlycemicLoad = (data, ruleset) => {
    const gg = ruleset.greenGate;
    if (data.carbs === void 0 && data.totalSugar === void 0) return null;
    const ings = data.ingredients ?? [];
    const isBeverage = !!data.isBeverage;
    const basis = data.evaluationBasis ?? "per-serving";
    const BEVERAGE_GL_FALLBACK = 355;
    let mult;
    if (basis === "per-serving") {
      mult = 1;
    } else {
      const flatDefault = isBeverage ? BEVERAGE_GL_FALLBACK : ruleset.racc.default;
      const servingGrams = resolveRaccServing(data.realServingWeight, flatDefault, ruleset);
      mult = servingGrams / 100;
    }
    const ps = (x) => x === void 0 ? void 0 : x * mult;
    const carbsS = ps(data.carbs);
    const sugarS = ps(data.totalSugar) ?? 0;
    const fiberS = ps(data.fiber) ?? 0;
    const proteinS = ps(data.protein) ?? 0;
    const fatS = ps(data.fat) ?? 0;
    const availableCarbs = carbsS !== void 0 ? Math.max(0, carbsS - fiberS) : sugarS;
    const sugarFrac = availableCarbs > 0 ? clampGL(sugarS / availableCarbs, 0, 1) : sugarS > 0 ? 1 : 0;
    const starchFrac = 1 - sugarFrac;
    const refined = hasRefinedGrainsIngredient(ings);
    const whole = gg.wholeGrainTerms.some((t) => ings.some((i) => i.includes(t)));
    const starchGI = refined ? gg.starchGI.refined : whole ? gg.starchGI.whole : gg.starchGI.unknown;
    let gi = sugarFrac * gg.sugarGI + starchFrac * starchGI;
    if (isBeverage && sugarS > 0) gi *= gg.beverageSugarFormMult;
    if (availableCarbs > 0 && fatS + proteinS >= availableCarbs) gi *= gg.macroBluntMult;
    gi = clampGL(gi, 0, 100);
    return gi / 100 * availableCarbs;
  };
  var ramp = (x, green, yellow, severe, k, severePts) => {
    if (x <= green) return 0;
    if (x <= yellow) {
      const f = (x - green) / (yellow - green);
      return k * f * f;
    }
    return k + (severePts - k) * (x - yellow) / (severe - yellow);
  };
  var scoreDiabetesInner = (data, ruleset) => {
    data = { ...data };
    const evaluationBasis = data.evaluationBasis ?? "per-serving";
    const satfatMissing = data.saturatedFat === void 0;
    const qualityCheck = checkDataQuality(data, ruleset);
    if (!qualityCheck.isValid) {
      return {
        verdict: "unknown",
        score: 0,
        points: { sugar: 0, sodium: 0, satFat: 0, flags: 0 },
        fiberCreditGrams: 0,
        vetoes: { transFat: false },
        gl: null,
        servingBasis: { grams: void 0, evaluationBasis },
        greenGates: { glGateFired: false, greenIntegrityFired: false, satfatFailsafeFired: false }
      };
    }
    const servingGrams = evaluationBasis === "per-serving" ? void 0 : resolveRaccServing(data.realServingWeight, ruleset.racc.default, ruleset);
    const mult = servingGrams === void 0 ? 1 : servingGrams / 100;
    const sugarEff100 = Math.max(data.totalSugar ?? 0, data.addedSugar ?? 0);
    const sugarBase_ps = sugarEff100 * mult;
    const sodium_ps = (data.sodium ?? 0) * mult;
    const satfat_ps = (data.saturatedFat ?? 0) * mult;
    const transfat_ps = (data.transFat ?? 0) * mult;
    const fiber_ps = (data.fiber ?? 0) * mult;
    const carbs_ps = data.carbs !== void 0 ? data.carbs * mult : NaN;
    const calories_ps = (data.calories ?? 0) * mult;
    let pct = 0;
    let pctIncomputable = false;
    if (calories_ps > 0) {
      pct = satfat_ps * 9 / calories_ps * 100;
    } else if (satfat_ps > 0) {
      pctIncomputable = true;
    }
    const { zeroBelowPct, fullAbovePct } = ruleset.satFat.density;
    const df_eff = pctIncomputable ? 1 : Math.max(0, Math.min(1, (pct - zeroBelowPct) / (fullAbovePct - zeroBelowPct)));
    const lactoseDiscount = data.reviewTags?.lactoseSugarDiscount === true;
    const sugarAfterReview = lactoseDiscount ? sugarBase_ps * ruleset.reviewLane.lactoseSugarFactor : sugarBase_ps;
    const sugarAxis = ruleset.axes.sugar;
    const fiberCarbMin = Number.isNaN(carbs_ps) ? fiber_ps : Math.min(fiber_ps, carbs_ps);
    const credit = sugarAfterReview >= sugarAxis.severe ? 0 : Math.min(ruleset.credits.fiber.gramsPerGram * fiberCarbMin, ruleset.credits.fiber.capGrams);
    const sugarEff = Math.max(0, sugarAfterReview - credit);
    const usedFiberCredit = sugarAfterReview > sugarAxis.green && sugarEff <= sugarAxis.green;
    const severePts = ruleset.points.rampSevereAnchor;
    const k = ruleset.points.knee;
    const sodiumAxis = ruleset.axes.sodium;
    const satAxis = ruleset.axes.satFat;
    const pSugar = ramp(sugarEff, sugarAxis.green, sugarAxis.yellow, sugarAxis.severe, k, severePts);
    const pSodium = ramp(sodium_ps, sodiumAxis.green, sodiumAxis.yellow, sodiumAxis.severe, k, severePts);
    const rA = ramp(satfat_ps, satAxis.green, satAxis.yellow, satAxis.severe, k, severePts);
    const rB = ramp(satfat_ps, ruleset.satFat.unconditionalAnchor, satAxis.yellow, satAxis.severe, k, severePts);
    const pSatfat = Math.min(Math.max(rA * df_eff, rB), ruleset.satFat.capPoints);
    const ingredients = data.ingredients ?? [];
    const hasIngredientData = ingredients.length > 0 && ingredients[0] !== "Ingredients information unavailable";
    const novaKnown = data.novaGroup !== void 0;
    const refined = hasIngredientData ? hasRefinedGrainsIngredient(ingredients) : false;
    const artificial = hasIngredientData ? hasArtificialSweetenersIngredient(ingredients) : false;
    const ultra = hasIngredientData ? hasUltraprocessedRedIngredient(ingredients) : novaKnown && data.novaGroup >= 4;
    const flagCount = (refined ? 1 : 0) + (artificial ? 1 : 0) + (ultra ? 1 : 0);
    const pFlags = flagCount * ruleset.flags.pointsEach;
    const penalties = pSugar + pSodium + pSatfat + pFlags;
    const veto = transfat_ps > ruleset.transFat.vetoAboveGrams;
    const score = Math.max(0, 100 - penalties) * (veto ? 0 : 1);
    const rodeLeanFat = satfat_ps > satAxis.green && satfat_ps <= ruleset.satFat.unconditionalAnchor;
    const gl = computeGlycemicLoad(data, ruleset);
    let verdict;
    let glGateFired = false;
    let greenIntegrityFired = false;
    let satfatFailsafeFired = false;
    if (veto) {
      verdict = "red";
    } else if (penalties >= ruleset.points.red) {
      verdict = "red";
    } else if (penalties < ruleset.epsilonGreen) {
      if (gl !== null && gl >= ruleset.greenGate.maxGL) {
        verdict = "yellow";
        glGateFired = true;
      } else {
        const ingredientsMissing = !hasIngredientData && !novaKnown;
        if (ingredientsMissing && (usedFiberCredit || rodeLeanFat)) {
          verdict = "yellow";
          greenIntegrityFired = true;
        } else if (satfatMissing) {
          verdict = "unknown";
          satfatFailsafeFired = true;
        } else {
          verdict = "green";
        }
      }
    } else {
      verdict = "yellow";
    }
    return {
      verdict,
      score,
      points: { sugar: pSugar, sodium: pSodium, satFat: pSatfat, flags: pFlags },
      fiberCreditGrams: credit,
      vetoes: { transFat: veto },
      gl,
      servingBasis: { grams: servingGrams, evaluationBasis },
      greenGates: { glGateFired, greenIntegrityFired, satfatFailsafeFired }
    };
  };
  var scoreDiabetesDetailed = (data, ruleset = DEFAULT_RULESET) => scoreDiabetesInner(data, ruleset);
  var scoreDiabetes = (data, ruleset = DEFAULT_RULESET) => scoreDiabetesInner(data, ruleset).verdict;
  return __toCommonJS(sb_entry_exports);
})();

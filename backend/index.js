const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const axios = require("axios");

const pool = require("./db");
const fs = require("fs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

let all; //  all data from new combination
let all_LinkBBP; // all data from link BBP
let full_code;
let popular;
let metal_price;

// to gbp and avrage
let gold_bid;
let gold_offer;
let silver_bid;
let silver_offer;

let gold_bid_int;
let gold_offer_int;
let silver_bid_int;
let silver_offer_int;

let gold_avg;
let silver_avg;

let purchase_rate_formula_based;
let mj_sell_rate_to_update;
let ppb_bm_internal_use;

let bm_minted_value;
let mj_pamp_value;
let bbp_bv_link_price_value;
let bbp_bv_formula_price_value;
let bbp_pamp_link_price_value;
let bbp_pamp_formula_value;

let testarr = {};

// all calculaed values for new combination.
let mj_sell_rate;
let newcode;
let troyounce_gold;
let fine_troy_ounce;
let gross_weight;
let fineness;
let fine_weight;
let metal_cost_api;

// all calculaed values for link bbp.
let mj_sell_rate_linkBBP;
let newcode_linkBBP;
let troyounce_gold_linkBBP;
let fine_troy_ounce_linkBBP;
let gross_weight_linkBBP;
let fineness_linkBBP;
let fine_weight_linkBBP;
let metal_cost_api_linkBBP;
let sell_price_formula_LinkBBP;
let bbp_margin_live_link_LinkBBP;
let bbp_bm_internal_use_LinkBBP;

const rouundoff = (value) => {
  var return_value = Math.round((value + Number.EPSILON) * 100) / 100;
  return return_value;
};

const getall_data = async () => {
  try {
    console.log("all data req send...");
    const alldata = await pool.query(
      "SELECT * FROM public.new_combination_test"
    );
    const alldata_linkBBP = await pool.query(
      "SELECT * FROM public.link_bbp_test"
    );
    all_LinkBBP = alldata_linkBBP.rows;
    all = alldata.rows;
    console.log(all, "set running");
    console.log(all_LinkBBP, "link bbp data");
  } catch (error) {
    console.log(error, "error");
  }
};

app.get("/all", cors(), async (req, res) => {
  try {
    console.log("all data req send...");
    const alldata = await pool.query(
      "SELECT * FROM public.new_combination_test"
    );
    res.json(alldata);

    console.log(all, "set running");
  } catch (error) {
    console.log(error, "error");
  }
});

app.get("/all_suppliers", cors(), async (req, res) => {
  try {
    console.log("all data req send...");
    const alldata = await pool.query(
      "SELECT supplier_id , supplier_name, supplier_email, phone_1, phone_2 FROM public.add_supplier_form"
    );
    res.json(alldata);
    console.log("set running");
  } catch (error) {
    res.send(error);
    console.log(error, "error");
  }
});

app.post("/add_suppliers", cors(), async (req, res) => {
  const supplier_data = req.body;
  console.log(supplier_data, "supplier");
  try {
    console.log(supplier_data, "suppliers data req send...");
    const alldata = await pool.query(
      "INSERT INTO public.add_supplier_form (supplier_name,supplier_email, phone_1,phone_2) VALUES( $1,$2,$3,$4);",
      [
        supplier_data.name,
        supplier_data.email,
        supplier_data.phone_1,
        supplier_data.phone_2,
      ]
    );
    res.send(alldata);
  } catch (error) {
    res.send(error);
    console.log(error, "error");
  }
});

app.post("/update_suppliers", cors(), async (req, res) => {
  const supplier_data = req.body;
  console.log(supplier_data, "supplier");
  try {
    console.log(supplier_data, "suppliers data req send...");
    const alldata = await pool.query(
      "UPDATE public.add_supplier_form SET supplier_name =$1, supplier_email =$2,  phone_1 =$3,phone_2 = $4 WHERE supplier_id =$5",
      [
        supplier_data.name,
        supplier_data.email,
        supplier_data.phone_1,
        supplier_data.phone_2,
        supplier_data.supplier_id,
      ]
    );
    res.send(alldata);
  } catch (error) {
    res.send(error);
    console.log(error, "error");
  }
});

app.get("/full_products_code", cors(), async (req, res) => {
  try {
    const alldata = await pool.query("SELECT * FROM public.full_code");
    res.json(alldata);
    full_code = alldata.rows;
    console.log("ALL DATA API");
  } catch (error) {
    console.log(error, "error");
  }
});

app.get("/popular_products_code", cors(), async (req, res) => {
  try {
    const alldata = await pool.query("SELECT * FROM public.popular_code");
    res.json(alldata);
    popular = alldata.rows;
    console.log("popular DATA API");
  } catch (error) {
    console.log(error, "error");
  }
});

app.post("/suppliers", cors(), async (req, res) => {
  let code = req.body.value;
  console.log(code, "code");

  try {
    const test_desc = await pool.query(
      "SELECT description FROM full_code WHERE product_code=$1",
      [code]
    );
    const bm_minted = await pool.query(
      "SELECT mj_sell_rate FROM public.new_combination WHERE new_code=$1 AND supplier_name='BAIRD MINT'",
      [code]
    );

    const mj_pamp = await pool.query(
      "SELECT mj_sell_rate FROM new_combination WHERE new_code=$1 AND supplier_name='BOXERDOME'",
      [code]
    );

    const bbp_bv_link_price = await pool.query(
      "SELECT sell_price_formula FROM link_bbp_1 WHERE new_code=$1  AND supplier_name='BBP BEST VALUE'",
      [code]
    );

    const bbp_bv_formula_price = await pool.query(
      "SELECT bbp_sell_price_link FROM link_bbp_1 WHERE new_code=$1  AND supplier_name='BBP BEST VALUE'",
      [code]
    );

    const bbp_pamp_link_price = await pool.query(
      "SELECT bbp_sell_price_link FROM link_bbp_1 WHERE new_code=$1 AND supplier_name='BBP PAMP'",
      [code]
    );

    const bbp_pamp_formula = await pool.query(
      "SELECT sell_price_formula FROM link_bbp_1 WHERE new_code=$1 AND supplier_name='BBP PAMP'",
      [code]
    );

    testarr.bm_minted_value = bm_minted.rows
      .map((e) => e.mj_sell_rate)
      .toString();
    testarr.mj_pamp_value = mj_pamp.rows.map((e) => e.mj_sell_rate).toString();
    testarr.bbp_bv_link_price_value = bbp_bv_link_price.rows
      .map((e) => e.sell_price_formula)
      .toString();
    testarr.bbp_bv_formula_price_value = bbp_bv_formula_price.rows
      .map((e) => e.bbp_sell_price_link)
      .toString();
    testarr.bbp_pamp_link_price_value = bbp_pamp_link_price.rows
      .map((e) => e.bbp_sell_price_link)
      .toString();
    testarr.bbp_pamp_formula_value = bbp_pamp_formula.rows
      .map((e) => e.sell_price_formula)
      .toString();
    testarr.code = code;
    testarr.description = test_desc.rows.map((e) => e.description).toString();
  } catch (error) {
    res.send(error);
  }
  res.json(testarr);
});

const live_price = async () => {
  try {
    await axios
      .get("https://6955-54-81-131-170.ngrok.io/liveprice")
      .then((resp) => {
        metal_price = resp.data;
        gold_bid = metal_price[0].currency.GBP.bid;
        gold_offer = metal_price[0].currency.GBP.offer;
        silver_bid = metal_price[5].currency.GBP.bid;
        silver_offer = metal_price[5].currency.GBP.offer;

        gold_bid_int = parseFloat(gold_bid.replace(",", "")) / 31.103478;
        gold_offer_int = parseFloat(gold_offer.replace(",", "")) / 31.103478;
        silver_bid_int = parseFloat(silver_bid.replace(",", "")) / 31.103478;
        silver_offer_int =
          parseFloat(silver_offer.replace(",", "")) / 31.103478;
        gold_avg = (gold_bid_int + gold_offer_int) / 2;
        silver_avg = (silver_bid_int + silver_offer_int) / 2;
        // fs.writeFileSync("datafile.json", JSON.stringify(metal_price));
      });
  } catch (error) {
    console.log(error, "error");
  }
};

app.get("/liveprice", cors(), async (req, res) => {
  console.log("live price api hit");
  live_price();
  res.send(metal_price);
});

const update = async () => {
  try {
    await pool.query(
      "UPDATE public.new_combination_test SET fine_troy_ounce =$1, fine_weight =$2,  troyounce_gold =$3, metal_cost_api=$4, purchase_rate_formula =$5 ,mj_sell_rate=$6,ppb_internal_use=$7 WHERE new_code =$8",
      [
        fine_troy_ounce,
        fine_weight,
        troyounce_gold,
        metal_cost_api,
        purchase_rate_formula_based,
        mj_sell_rate_to_update,
        ppb_bm_internal_use,
        newcode,
      ]
    );
    console.log("updated New combination");
  } catch (error) {
    console.log(error, "error in updating New Combination");
  }
};
const update_linkbbp = async () => {
  try {
    await pool.query(
      "UPDATE public.link_bbp_test SET fine_troy_ounce =$1, fine_weight =$2,  troy_ounce_content =$3, metal_cost_api=$4,sell_price_formula=$5,bbp_margin_live_link=$6, ppb_internal_use=$7 WHERE new_code =$8",
      [
        fine_troy_ounce_linkBBP,
        fine_weight_linkBBP,
        troyounce_gold_linkBBP,
        metal_cost_api_linkBBP,
        sell_price_formula_LinkBBP,
        bbp_margin_live_link_LinkBBP,
        ppb_bm_internal_use,
        newcode,
      ]
    );
    console.log("updated Link bbp");
  } catch (error) {
    console.log(error, "error in updating Link BBP");
  }
};

const update_test = async (e) => {
  await getall_data();
  await live_price();
  all?.forEach((value) => {
    newcode = value.new_code;
    fine_troy_ounce = rouundoff(
      (value.gross_weight * value.fineness) / 31.1034768 / 1000
    );
    fine_weight = rouundoff((value.gross_weight * value.fineness) / 1000);
    troyounce_gold = rouundoff(fine_weight / 31.1034768);
    if (value.metal_type === "GOLD") {
      metal_cost_api = rouundoff(fine_weight * gold_avg);
      console.log("gold");
    } else {
      if (value.metal_type === "SILVER") {
        metal_cost_api = rouundoff(fine_weight * silver_avg);
        console.log("silver");
      }
    }
    purchase_rate_formula_based = rouundoff(
      metal_cost_api * (1 + value.baird_pamp / 100)
    );
    mj_sell_rate_to_update = rouundoff(
      purchase_rate_formula_based * (1 + value.mj_margin / 100)
    );
    ppb_bm_internal_use = rouundoff(
      mj_sell_rate_to_update - purchase_rate_formula_based
    );

    console.log(
      newcode,
      // fine_troy_ounce,
      // fine_weight,
      // troyounce_gold,
      // metal_cost_api,
      // purchase_rate_formula_based,
      mj_sell_rate_to_update,
      ppb_bm_internal_use,
      "newcode + other values"
    );
    update();
  });
};

const update_test_linkbbp = async (e) => {
  // await getall_data(); // to be revoved later
  // await live_price(); //to get all live price
  all_LinkBBP?.forEach((value) => {
    newcode = value.new_code;
    fine_troy_ounce_linkBBP = rouundoff(
      (value.gross_weight * value.finess) / 31.1034768 / 1000
    );
    fine_weight_linkBBP = rouundoff((value.gross_weight * value.finess) / 1000);
    troyounce_gold_linkBBP = rouundoff(fine_weight_linkBBP / 31.1034768);
    metal_cost_api_linkBBP = rouundoff(value.gross_weight * gold_avg);
    sell_price_formula_LinkBBP = rouundoff(
      metal_cost_api_linkBBP * (1 + value.bbp_cost_formula / 100)
    );
    bbp_margin_live_link_LinkBBP = rouundoff(
      (value.bbp_sell_price_link.replace(",", "") - metal_cost_api_linkBBP) /
        metal_cost_api_linkBBP
    );

    ppb_bm_internal_use = rouundoff(
      value.bbp_sell_price_link.replace(",", "") - sell_price_formula_LinkBBP
    );
    console.log(
      newcode,
      fine_troy_ounce_linkBBP,
      fine_weight_linkBBP,
      troyounce_gold_linkBBP,
      metal_cost_api_linkBBP,
      sell_price_formula_LinkBBP,
      bbp_margin_live_link_LinkBBP,
      ppb_bm_internal_use,
      "newcode + other values of link BBP"
    );
    update_linkbbp();
  });
};


setInterval(() => {
  // update_test();
  // update_test_linkbbp();
}, 90000);

app.listen(port, () => {
  console.log(`listining at port ${port}`);
});

import { useEffect, useState } from 'react'
import shopeeData from '../json/data-nav-ndr.json'

function App() {
  const [redirecting, setRedirecting] = useState(true)

  // Function to get URL parameter
  const getURLParameter = (name) => {
    const query = window.location.search.substring(1)
    const vars = query.split('&')
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=')
      if (pair[0] === name) {
        return decodeURIComponent(pair[1])
      }
    }
    return ''
  }

  // Shopee URLs - mengambil dari JSON file
  const getShopeeUrls = () => {
    // Ambil data dari JSON dengan key "shopee-yt-android2"
    const navRoutes = shopeeData['shopee-yt-android2'] || []
    
    // Tambahkan prefix shopeeid://home?navRoute= ke setiap item
    const baseUrls = navRoutes.map(navRoute => {
      return `shopeeid://home?navRoute=${navRoute}`
    })
    
    return baseUrls
  }

  // TikTok URLs
  const tiktokUrls = [
    "snssdk1180://ec/pdp?biz_type=0&gd_label=click_wap_share_from_pdp_auto&need_mall=1&needlaunchlog=1&page_name=reflow_pdp&params_url=https%3A%2F%2Fshop-id.tokopedia.com%2Fview%2Fproduct%2F1729569758194076097%3F_svg%3D1%26chain_key%3D%257B%2522t%2522%253A1%252C%2522k%2522%253A%2522000000000000000007576890109846783764%2522%252C%2522sc%2522%253A%2522telegram%2522%257D%26checksum%3Def35ef707eea1ffdcc1bc4ea187fc5a027cc10e3aa1b335e4aecbee82e3aedec%26encode_params%3DMIIBUwQM1JdqR_dFljWa5BeRBIIBL4oXHOg_jywIz8VJ40Gx8Vb1ad3sbZ1d7gB7rqEHyZ5IQf_e9B0nxXITMXH7y8Nye5k604b3V5VkUm346ear07RuDM759mOhv7UMmT0WmmMzeii1BAdxgDtwIH7lxnO3mjwH3ARBAOLUS6_uHB1DK8F3d6HbweNc_z1FgXfFL26V5pohQn9qZsbPmXf_Vy909plLrHb3llX0Eigx60hNxTztqft848F1NLfHlSRnDh8sRrggGcj8Rno-wwrTtX7QGqKiBYbVUzmqlOMx6y7QucfYvTF8wHFuYMo1UR96GatnqA3znPOsgf9rH1da4320oj0rFE-Fc-yumojDlwaICitl_AajGxzFZk2Ouqa2vJ8UzUu8r7FkCo8vBFt-BhRcf373uyaql6xOJxeSeQyfCQQQAxDhITW81gZsKv2qWJEiGg%253D%253D%26og_info%3D%257B%2522title%2522%253A%2522HANRIVER%2B%2526%2BKUCADI%2BKursi%2Bkantor%2Bmewah%252C%2Bkualitas%2Btinggi%2Bdan%2Bharga%2Bmurah%252C%2Bmulti-warna%2Bopsional%2B%255Bgaransi%2Blima%2Btahun%255D%2522%252C%2522image%2522%253A%2522https%253A%255C%252F%255C%252Fp16-oec-sg.ibyteimg.com%255C%252Ftos-alisg-i-aphluv4xwc-sg%255C%252Fefafcf3d747446cd9f6ea6e484398ad6%257Etplv-aphluv4xwc-resize-webp%253A260%253A260.webp%253Fdr%253D15582%2526t%253D555f072d%2526ps%253D933b5bde%2526shp%253D7745054a%2526shcp%253D9b759fb9%2526idc%253Dmy2%2526from%253D2001012042%2522%257D%26sec_user_id%3DMS4wLjABAAAA70BN7X41aK7ZuXBwsepeaEyxj_5kkqtyDFfpnbeXyNbVs_2WVlG2La1NfivmBZ7e%26share_app_id%3D1180%26share_iid%3D7576071088204711688%26share_link_id%3Ddab022a3-3bc4-4cc5-b64a-ae06cdcb12bd%26share_region%3DID%26social_share_type%3D15%26timestamp%3D1764132219%26trackParams%3D%257B%2522traffic_source%2522%253A3%252C%2522traffic_source_list%2522%253A%255B3%255D%252C%2522enable_shop_tab_popup%2522%253A1%252C%2522device_id%2522%253A%25227397045967285454342%2522%257D%26u_code%3Defc96a2d52kfia%26ug_btm%3Db2631%252Cb6661%26ugbiz_name%3DUNKNOWN%26unique_id%3Drakgadgetid%26user_id%3D7397046588079670277%26utm_campaign%3Dclient_share%26utm_medium%3Dandroid%26utm_source%3Dtelegram&refer=web&requestParams=%7B%22product_id%22%3A%5B%221729569758194076097%22%5D%7D&trackParams=%257B%2522traffic_source_list%2522%253A%255B3%255D%252C%2522enable_shop_tab_popup%2522%253A1%252C%2522device_id%2522%253A%25227397045967285454342%2522%257D&is_commerce=1&needlaunchlog=1&jump_time=1764591080043&h5_start_ts=1764591079360",
    "snssdk1180://ec/pdp?biz_type=0&gd_label=click_wap_share_from_pdp_auto&need_mall=1&needlaunchlog=1&page_name=reflow_pdp&params_url=https%3A%2F%2Fshop-id.tokopedia.com%2Fview%2Fproduct%2F1729916104977450521%3F_svg%3D1%26chain_key%3D%257B%2522t%2522%253A1%252C%2522k%2522%253A%2522000000000000000007576890313915483925%2522%252C%2522sc%2522%253A%2522telegram%2522%257D%26checksum%3D2c72dcb14aaabf376b8a340c6e048263cbf9caaf4f2fb7660dfd19d7b8bc06b0%26encode_params%3DMIIBUwQMLYOrMWSId0Y1hT2PBIIBL4sLwZTbu33gXbIiZbY6EjQNdbpe1FfU3i8O1k9MCtQAvWCovXxn7VV7uP-NU8Hcb7ouRmmPM--L0TI5r1Zr-PtVaE9U-9Dn2vsoWQJ6VdwhH9Q0rWOnw1ZhDrafmCoZAqm2HvY2jKu0FjDcpZhn3jT-ijpPTp0DBLWie4ivUUAYNv-mX6-ANogYi1oRLrrEKr06Lb4_U9YktbooCTc52WVnqjBgTf--sSVzOVjPb9pPC6xowzeWWR3ufxXgEWyliOn6EKENPi_oZc6lWcG_68t2Nc3tYAGCKX-y_AJkYSBFRl-SY_6eZSYtCUsmcHGTAt-KkGnr7Rtaej_6Q0qf0EV_J2KDaax1QFj8-dg0V5nvdTBlEHoTTWljddmh8TABuAurn-HyfB4kQ4OolETgRgQQnB00Rt-WEDm85CTdlUIeGA%253D%253D%26og_info%3D%257B%2522title%2522%253A%2522Xiaomi%2BTV%2BA%2B32%2B%257C%2BDolby%2BDTS%2BAudio%2B%257C%2BPremium%2BMetalic%2BFrame%2B%257C%2BBezel-Less%2BDesign%2B%257C%2BSmart%2BHD%2BTV%2B%255B%2BOfficial%2BStore%2B%255D%2522%252C%2522image%2522%253A%2522https%253A%255C%252F%255C%252Fp16-oec-sg.ibyteimg.com%255C%252Ftos-alisg-i-aphluv4xwc-sg%255C%252Ff36664df5e394e68888c2ac08a6cda8e%257Etplv-aphluv4xwc-resize-webp%253A260%253A260.webp%253Fdr%253D15582%2526t%253D555f072d%2526ps%253D933b5bde%2526shp%253D7745054a%2526shcp%253D9b759fb9%2526idc%253Dmy2%2526from%253D2001012042%2522%257D%26sec_user_id%3DMS4wLjABAAAA70BN7X41aK7ZuXBwsepeaEyxj_5kkqtyDFfpnbeXyNbVs_2WVlG2La1NfivmBZ7e%26share_app_id%3D1180%26share_iid%3D7576071088204711688%26share_link_id%3D579b8b78-a0cb-4ee3-ae96-d55ad97c64ed%26share_region%3DID%26social_share_type%3D15%26timestamp%3D1764132256%26trackParams%3D%257B%2522traffic_source%2522%253A3%252C%2522traffic_source_list%253A%255B3%255D%252C%2522enable_shop_tab_popup%2522%253A1%252C%2522device_id%2522%253A%25227397045967285454342%2522%257D%26u_code%3Defc96a2d52kfia%26ug_btm%3Db2631%252Cb6661%26ugbiz_name%3DUNKNOWN%26unique_id%3Drakgadgetid%26user_id%3D7397046588079670277%26utm_campaign%3Dclient_share%26utm_medium%3Dandroid%26utm_source%3Dtelegram&refer=web&requestParams=%7B%22product_id%22%3A%5B%221729916104977450521%22%5D%7D&trackParams=%257B%2522traffic_source_list%253A%255B3%255D%252C%2522enable_shop_tab_popup%2522%253A1%252C%2522device_id%2522%253A%25227397045967285454342%2522%257D&is_commerce=1&needlaunchlog=1&jump_time=1764591094407&h5_start_ts=1764591093248",
    "snssdk1180://ec/pdp?biz_type=0&gd_label=click_wap_share_from_pdp_auto&need_mall=1&needlaunchlog=1&page_name=reflow_pdp&params_url=https%3A%2F%2Fwww.tiktok.com%2Fview%2Fproduct%2F1729502778894486380%3F_svg%3D1%26chain_key%3D%257B%2522t%2522%253A1%252C%2522k%2522%253A%2522000000000000000007576890510364526343%2522%252C%2522sc%2522%253A%2522telegram%2522%257D%26checksum%3Dc63148cc52e379b15280aaacf3bfd6589b720b839c3e96a8c4454dde31b9ee2f%26encode_params%3DMIIBUQQMNzUXahFttCQoXn6hBIIBLf1sZQs8_CKm1Be6yf2pE3Z9Ak85la-PfX6gwzPuBzx0oBgFjxoXhiDFG8fnCEikmQXGGH-rSlt5ES_CX-zC00RFDXa1JO0lDxdWFv5FAybqQNj0ftfz8aYa1hTIN7c_dnapV5qQ5GzOczRXuaEF7nw0cnffR-wX0MDqstDMUlEc4y7ER-7f1c_6qL6_ZbTJtl4XsAQ2rOiMIe01gAh3u-qqRWh9AH9p1RIk5hkl2zuNB_sXqB_eNTCqdAvkVc98jt9zDmpW5IjATNbEI_IgRt_kM9hCFL-Rk7SGbXHQ2hWmdcj6wfVn9I7TNXeo1l6N4gHtjRL-pSB_rjpDz5NRGKXSN-g9vdrZTz08CIjMi-pb1u2-PUERpUKExkJfq2ee5lIoK9-17oDSLI_4unAEEDg_VMSdQzCsfRMcoMiZQBc%253D%26og_info%3D%257B%2522title%2522%253A%2522POLYTRON%2BKulkas%2B1%2BPintu%2BBeauty%2Bmetal%2Bdoor%2B180%2Bliter%2BPRB%2B189B%2522%252C%2522image%2522%253A%2522https%253A%255C%252F%255C%252Fp16-oec-sg.ibyteimg.com%255C%252Ftos-alisg-i-aphluv4xwc-sg%255C%252F3c6f208eef6c4258aefcba331decd89e%257Etplv-aphluv4xwc-resize-webp%253A260%253A260.webp%253Fdr%253D15582%2526t%253D555f072d%2526ps%253D933b5bde%2526shp%253D7745054a%2526shcp%253D9b759fb9%2526idc%253Dmy%2526from%253D2001012042%2522%257D%26sec_user_id%3DMS4wLjABAAAAlaXwdo_kqTBXLu4oZd_3dFT-qubzw3cHv8PtOvuSTKk0UU4CkDO_VIXuhOOmZW31%26share_app_id%3D1180%26share_link_id%3DA717ACD1-8877-4943-BE14-B2ECACA16336%26share_region%3DID%26social_share_type%3D15%26timestamp%3D1764132307%26trackParams%3D%257B%2522enable_shop_tab_popup%2522%253A1%252C%2522device_id%2522%253A%25227100564132613342721%2522%252C%2522enter_from_info%2522%253A%2522product_share_outside%2522%252C%2522source_page_type%2522%253A%2522product_share%2522%252C%2522traffic_source_list%253A%255B3%255D%252C%2522traffic_source%2522%253A3%257D%26tt_from%3Dtelegram%26u_code%3DE38CH6%253AI%253A%253AI5%253A3%26ug_btm%3Db8727%252Cb6661%26unique_id%3Dsriwwahyuni_%26user_id%3D7130403662845920282%26utm_campaign%3Dclient_share%26utm_medium%3Dios%26utm_source%3Dtelegram&refer=web&requestParams=%7B%22product_id%22%3A%5B%221729502778894486380%22%5D%7D&trackParams=%257B%2522enable_shop_tab_popup%2522%253A1%252C%2522device_id%2522%253A%25227100564132613342721%2522%252C%2522enter_from_info%2522%253A%2522product_share_outside%2522%252C%2522source_page_type%2522%253A%2522product_share%2522%252C%2522traffic_source_list%253A%255B3%255D%257D&is_commerce=1&needlaunchlog=1&jump_time=1764591108167&h5_start_ts=1764591107482",
    "snssdk1180://ec/pdp?biz_type=0&gd_label=click_wap_share_from_pdp_auto&need_mall=1&needlaunchlog=1&page_name=reflow_pdp&params_url=https%3A%2F%2Fwww.tiktok.com%2Fview%2Fproduct%2F1729548416496863354%3F_svg%3D1%26chain_key%3D%257B%2522t%2522%253A1%252C%2522k%2522%253A%2522000000000000000007576890831928608520%2522%252C%2522sc%2522%253A%2522telegram%2522%257D%26checksum%3D2d546f60ad60150570d700f2ec8750d1bc0d5afa88c8bc194593801d570b1bd0%26encode_params%3DMIIBUQQMUfISIia_WNvV1pAqBIIBLbYHqDrl_m1xpGMaYTPkVXO99oS0XfeeCOAJ5yMBj25FuH8vDXuykBchlADRDjezRSer78hI-mHARtlzDt1qxVn4l8eYvRRRHX9xlthk2GJMEWY_LhP5x1SMZL_4KBoxZ_tc2S_zrs2nhWWHDCZIJ0iF32Pqi2IZrUlOATOtfWkUi4cdi9O5y0is_WX-4FSoG3IkKFNrHIGy-eF063JTK9o5HUeSqFS4kt35--5KJcTulS2cJpyrHQZ5ybr13Y4zCQ-2-NpHFEm_D3-eswZV-k1RfSVv1ff4qoRgWc76lQROU5XmDaEFYfeKaCxYhcHU8-FTHcjKginhyYKwFqud7N7zdRU4077KqccL98LU-k8y4eZ5vy4k0mjXx1G3A-7Rcnk2HRMHOuLTNvmvHTMEEJF4qyHE3vpb7d91xUbXe0I%253D%26og_info%3D%257B%2522title%2522%253A%2522Mesin%2BCuci%2B2%2BTabung%2BDenpoo%2BDW%2B828%2BPapan%2BPenggilas%2B8KG%2522%252C%2522image%2522%253A%2522https%253A%255C%252F%255C%252Fp16-oec-sg.ibyteimg.com%255C%252Ftos-alisg-i-aphluv4xwc-sg%255C%252F5162821c7df442059d90271becb2a2c5%257Etplv-aphluv4xwc-resize-webp%253A260%253A260.webp%253Fdr%253D15582%2526t%253D555f072d%2526ps%253D933b5bde%2526shp%253D7745054a%2526shcp%253D9b759fb9%2526idc%253Dmy%2526from%253D2001012042%2522%257D%26sec_user_id%3DMS4wLjABAAAAlaXwdo_kqTBXLu4oZd_3dFT-qubzw3cHv8PtOvuSTKk0UU4CkDO_VIXuhOOmZW31%26share_app_id%3D1180%26share_link_id%3D3EF2DC4C-3C0F-467D-B417-E36188560B9F%26share_region%3DID%26social_share_type%3D15%26timestamp%3D1764132379%26trackParams%3D%257B%2522enable_shop_tab_popup%2522%253A1%252C%2522device_id%2522%253A%25227100564132613342721%2522%252C%2522enter_from_info%2522%253A%2522product_share_outside%2522%252C%2522source_page_type%2522%253A%2522product_share%2522%252C%2522traffic_source_list%253A%255B3%255D%252C%2522traffic_source%2522%253A3%257D%26tt_from%3Dtelegram%26u_code%3DE38CH6%253AI%253A%253AI5%253A3%26ug_btm%3Db8727%252Cb6661%26unique_id%3Dsriwwahyuni_%26user_id%3D7130403662845920282%26utm_campaign%3Dclient_share%26utm_medium%3Dios%26utm_source%3Dtelegram&refer=web&requestParams=%7B%22product_id%22%3A%5B%221729548416496863354%22%5D%7D&trackParams=%257B%2522enable_shop_tab_popup%2522%253A1%252C%2522device_id%2522%253A%25227100564132613342721%2522%252C%2522enter_from_info%2522%253A%2522product_share_outside%2522%252C%2522source_page_type%2522%253A%2522product_share%2522%252C%2522traffic_source_list%253A%255B3%255D%257D&is_commerce=1&needlaunchlog=1&jump_time=1764591121569&h5_start_ts=1764591121050"
  ]

  // Lazada URLs
  const lazadaUrls = [
    "lazada://id/web?url=https%3A%2F%2Fpages.lazada.co.id%2Fwow%2Fgcp%2Froute%2Flazada%2Fid%2Fupr_1000345_lazada%2Fchannel%2Fid%2Fupr-router%2Fid_upr%3Fpha%3Dtrue%26hybrid%3D1%26data_prefetch%3Dtrue%26prefetch_replace%3D1%26at_iframe%3D1%26wh_pid%3D%252Flazada%252Fchannel%252Fid%252Faffiliate%252Fams_lp%252FbP6pDtyRN5%26sub_id1%3Dtarinasari%26sub_aff_id%3Dfacebook%26exlaz%3De_mZsJLttrs%25252BJsbdaDA0DvZJn9Ji3%25252FSTAWDAo3n60nGqFwfKd6uf5SzAoQyImlfTPCB%25252F%25252FWJ%25252BYBXH4Kz7NNbuv8%25252BxlguXCOM6NHOeOaz2oUA1QUr03zp0NFmMd%25252F0bQL7TRLDAuAoB%25252B4j7UouqEhUVJDR%25252BItvEl8y%25252Bl1HAZTscXw%25252FcAid9GUYkm2r06Helb4mkcmOV9SnA62YiWQ%25252Fs8IWbLCoRdkrD8JRKbDxMXB5BSB2bHX8ihLrvz8X84ULf1%25252B7YbuNk8SeV5niRyNlTK%25252BMXwmyKTkRe6CXsYlW5MS6GhsyJVIOb3zkNSIu3V0ZvOeGENU%26fbclid%3DIwY2xjawMnWx9leHRuA2FlbQIxMABicmlkETFjUlJwZkZvT3c5aTBLN21EAR52b06WFLoS3oeN8hQo-uzKgYicnotQgwRuwGday_e90QJTEoscrMoQn2N8lg_aem_N62L7gjkRrsuhpab_89XTA&from_msite=1&exlaz=e_mZsJLttrs%252BJsbdaDA0DvZJn9Ji3%252FSTAWDAo3n60nGqFwfKd6uf5SzAoQyImlfTPCB%252F%252FWJ%252BYBXH4Kz7NNbuv8%252BxlguXCOM6NHOeOaz2oUA1QUr03zp0NFmMd%252F0bQL7TRLDAuAoB%252B4j7UouqEhUVJDR%252BItvEl8y%252Bl1HAZTscXw%252FcAid9GUYkm2r06Helb4mkcmOV9SnA62YiWQ%252Fs8IWbLCoRdkrD8JRKbDxMXB5BSB2bHX8ihLrvz8X84ULf1%252B7YbuNk8SeV5niRyNlTK%252BMXwmyKTkRe6CXsYlW5MS6GhsyJVIOb3zkNSIu3V0ZvOeGENU&dsource=smb&dauto=1&dfrom=msitedoc&browser=Chrome&deviceType=Android",
    "lazada://id/web?url=https%3A%2F%2Fpages.lazada.co.id%2Fwow%2Fgcp%2Froute%2Flazada%2Fid%2Fupr_1000345_lazada%2Fchannel%2Fid%2Fupr-router%2Fid_upr%3Fpha%3Dtrue%26hybrid%3D1%26data_prefetch%3Dtrue%26prefetch_replace%3D1%26at_iframe%3D1%26wh_pid%3D%252Flazada%252Fchannel%252Fid%252Faffiliate%252Fams_lp%252FbP6pDtyRN5%26sub_id1%3Dummu%26sub_aff_id%3Dfacebook%26exlaz%3De_nmWp%25252FYO0T3lsbdaDA0DvZJn9Ji3%25252FSTAWDAo3n60nGqFwfKd6uf5SzAoQyImlfTPCB%25252F%25252FWJ%25252BYBXH4Kz7NNbuv8%25252BxlguXCOM6NHOeOaz2oUA1QUr03zp0NFmMd%25252F0bQL7TRLDAuAoB%25252B4j7UouqEhUVJDR%25252BItvEl8y%25252Bl1HAZTscXw%25252FcC%25252B8URpPYyM58RxgjP3Sz7%25252Fu504dINLuQfNh8fczCaZofgiXZJ29NaTcVa5IagLQLLX8ihLrvz8X84ULf1%25252B7YbuNk8SeV5niRyNlTK%25252BMXwmyKTkRe6CXsYlW5MS6GhsyJVIOb3zkNSIu3V0ZvOeGENU%26fbclid%3DIwY2xjawMnW3tleHRuA2FlbQIxMABicmlkETFjUlJwZkZvT3c5aTBLN21EAR5t5ikpWPiLAIO-cLnboFIBpdXHMTgk80PhTNuQto2l20WhAYJnZpQ1g21kkQ_aem_UUbq__1NGn93CMlo0cbDRA&from_msite=1&exlaz=e_nmWp%252FYO0T3lsbdaDA0DvZJn9Ji3%252FSTAWDAo3n60nGqFwfKd6uf5SzAoQyImlfTPCB%252F%252FWJ%252BYBXH4Kz7NNbuv8%252BxlguXCOM6NHOeOaz2oUA1QUr03zp0NFmMd%252F0bQL7TRLDAuAoB%252B4j7UouqEhUVJDR%252BItvEl8y%252Bl1HAZTscXw%252FcC%252B8URpPYyM58RxgjP3Sz7%252Fu504dINLuQfNh8fczCaZofgiXZJ29NaTcVa5IagLQLLX8ihLrvz8X84ULf1%252B7YbuNk8SeV5niRyNlTK%252BMXwmyKTkRe6CXsYlW5MS6GhsyJVIOb3zkNSIu3V0ZvOeGENU&dsource=smb&dauto=1&dfrom=msitedoc&browser=Chrome&deviceType=Android"
  ]

  // Traveloka URLs
  const travelokaUrls = [
    "traveloka://hotel/detail/spec?hotelId=182137&checkInDate=16-12-2024&checkOutDate=17-12-2024&currency=IDR&totalRoom=1&totalGuest=2&utm_id=zuT2gU7O&referral-code=AFFILIATERICKBALPROGRAM&campaign-slug=affiliate-id&accessCode=c2creferral&contexts=contexts&utmId=zuT2gU7O",
    "traveloka://hotel/detail/spec?hotelId=3000010038988&checkInDate=16-12-2024&checkOutDate=17-12-2024&currency=IDR&totalRoom=1&totalGuest=2&utm_id=zuT2gU7O&referral-code=AFFILIATERICKBALPROGRAM&campaign-slug=affiliate-id&accessCode=c2creferral&contexts=contexts&utmId=zuT2gU7O",
    "traveloka://hotel/detail/spec?hotelId=3000010014429&checkInDate=16-12-2024&checkOutDate=17-12-2024&currency=IDR&totalRoom=1&totalGuest=1&utm_id=zuT2gU7O&referral-code=AFFILIATERICKBALPROGRAM&campaign-slug=affiliate-id&accessCode=c2creferral&contexts=contexts&utmId=zuT2gU7O",
    "traveloka://hotel/detail/spec?hotelId=297294&checkInDate=16-12-2024&checkOutDate=17-12-2024&currency=IDR&totalRoom=1&totalGuest=2&utm_id=zuT2gU7O&referral-code=AFFILIATERICKBALPROGRAM&campaign-slug=affiliate-id&accessCode=c2creferral&contexts=contexts&utmId=zuT2gU7O"
  ]

  // ShopeeFood URL
  const shopeeFoodUrl = "https://spf.shopee.co.id/4VVGTTFgTU"

  useEffect(() => {
    // Function to redirect to random URL from array
    const redirectToRandomUrl = (urls, delay) => {
      setTimeout(() => {
        const random = Math.floor(Math.random() * urls.length)
        window.location.href = urls[random]
      }, delay)
    }

    // Shopee redirect (1ms delay)
    const shopeeUrls = getShopeeUrls()
    redirectToRandomUrl(shopeeUrls, 1)

    // TikTok redirect (50ms delay)
    redirectToRandomUrl(tiktokUrls, 1)

    // Lazada redirect (100ms delay)
    redirectToRandomUrl(lazadaUrls, 1)

    // Traveloka redirect (150ms delay)
    redirectToRandomUrl(travelokaUrls, 1)

    // ShopeeFood redirect (500ms delay)
    setTimeout(() => {
      window.location.href = shopeeFoodUrl
    }, 1)

  }, [])

  return (
    <div className="loading-container">
      <div className="loading-text">PLEASE WAIT</div>
      <div className="loading-spinner"></div>
    </div>
  )
}

export default App


export interface Station {
  _id:                   string;
  station_id:            number;
  station_id_uuid:       string;
  station_name:          string;
  gateway_id:            number;
  gateway_id_hex:        string;
  product_number:        string;
  username:              string;
  user_email:            string;
  company_name:          string;
  active:                boolean;
  private:               boolean;
  recording_interval:    number;
  firmware_version:      string;
  imei:                  string;
  registered_date:       number;
  subscription_end_date: number;
  time_zone:             string;
  city:                  string;
  region:                string;
  country:               string;
  latitude:              number;
  longitude:             number;
  elevation:             number;
  __v:                   number;
}

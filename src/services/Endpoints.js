import client from './SharedConfig';

export const visitSchedule = ({catalogId="0", parameter={}, header={}} = {}) => {
    const config = {
        method: 'GET',
        url: `v3/customer_catalogs/address/visit-schedule/${catalogId}`,
        headers: header,
        params: parameter
    };
    return client.request(config )
}
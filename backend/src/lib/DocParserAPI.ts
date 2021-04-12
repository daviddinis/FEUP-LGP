import config from '../config';
import DataExtractor from './DataExtractor';


// tslint:disable-next-line:no-var-requires
const docparser = require('docparser-node');



class DocParserAPI {
	static client = new docparser.Client(config.docparserApiKey);

	static ping() : Promise<any> {
		return this.client
			.ping()
			.then(() => console.log('authentication succeeded!'))
			.catch((err : any) => console.error('authentication failed!', err));
	}

	static getParsers() : Promise<any> {
		return this.client.getParsers();
	}

	static getParsedDocument(parserId: string, documentId : string) : Promise<any> {
		return this.client.getResultsByDocument(parserId, documentId, {
			format: 'object',
		}).then((data: any[]) => data[0]);
	}

	static getAllParsedDocuments(parserId : string) : Promise<any> {
		return this.client.getResultsByParser(parserId, { format: 'object' });
	}

	static uploadDocument(parserId : string, filePath : string) : Promise<any> {
		return this.client.uploadFileByPath(parserId, filePath, {
			remote_id: 'test',
		});
	}

	//

	static async TestDocParser() {
		const parser = new DocParserAPI();

		await DocParserAPI.ping();

		console.log(await DocParserAPI.getParsers());

		const parserId = 'cvzcwokujphi';
		// const documentId = 'bc7dab2bb30b39d7991ce3557713a2cc'; // AFCA
		const documentId = '087782204d4bf8cd57365b736d61e53b'; // KB

		const data = await DocParserAPI.getParsedDocument(parserId, documentId);


		const strings = DataExtractor.extractStringArray(data.all_data_regex);
		console.log(DataExtractor.extractByKeywords(strings, [/address/i], {
			maxDistance: 1,
		}))

		console.log(DataExtractor.extractByKeywords(strings, [/company number/i], {
			maxDistance: 1,
			regex: /[0-9]{4,}/i, // minimum 4 digits
		}))


		console.log(DataExtractor.extractByKeywords(strings, [/company/i], {
			maxDistance: 1,
			includeKeyword: true,
		}))

		console.log(DataExtractor.extractByKeywords(strings, [/created on/, /incorporated on/i], {
			maxDistance: 1,
			regex: DataExtractor.regexes.DATE
		}))

		console.log(DataExtractor.extractByKeywords(strings, [/.*/], {
			maxDistance: 1,
			regex: DataExtractor.regexes.DATE
		}))

		console.log('2020-19-20 2020 Mar 29  March, 29, 200 29 April 29'.match(DataExtractor.regexes.DATE))



		// console.log(extractor.parseFinancialList(data.assets, ['total', 'assets']));

	}
}






export default DocParserAPI;
/*
async function run() {


  await ping();


  const parserId = "cvzcwokujphi";
  const documentId = "bc7dab2bb30b39d7991ce3557713a2cc";

  console.log(await client.getParsers());

  const document = (await getParsedDocument(parserId, documentId))[0];
  console.log(document.table_data);

  // const documentId = "testCC1";
  //const result = await getParsers();
  //const result = await getAllParsedDocuments(parserId);
  //const result = await getParsedDocument(parserId, "7368249ea703a2c7b9120984d8caeab9");

 // const result = await uploadDocument(parserId, "./MeuCESD.jpg");

  //console.log(result);

}

module.exports =

*/

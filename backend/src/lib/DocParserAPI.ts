import config from '../config';


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

import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';
import Download from './download';

interface Entry {
    mood: string;
    emotion: string;
    description: string;
    time: string;
}

Font.registerEmojiSource({
    format: 'png',
    url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/',
});


const MAX_OBJECTS_PER_PAGE = 10;

const PdfGenerator = ({ data }: { data: Entry[] }) => {    // Crée le document PDF
    const chunkArray = (arr: string | any[], size: number) => {
        const chunkedArr = [];
        let index = 0;
        while (index < arr.length) {
            chunkedArr.push(arr.slice(index, index + size));
            index += size;
        }
        return chunkedArr;
    };

    // Divisez les données en sous-tableaux
    const chunkedData = chunkArray(data, MAX_OBJECTS_PER_PAGE);

    const formatDate = (dateTimeString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Intl.DateTimeFormat('fr-FR', options).format(new Date(dateTimeString));
    };

    // Crée le document PDF
    const MyDocument = (
        <Document>
            {Array.isArray(chunkedData) && chunkedData.map((chunk: any, pageIndex) => (
                <Page key={pageIndex}>
                    <View style={styles.section}>
                        <Text style={styles.text}>M:É</Text>
                        <View style={styles.line} />
                        {chunk.map((entry: Entry, entryIndex: number) => (
                            <View style={styles.box} key={entryIndex}>
                                <View style={styles.flex}>
                                    <Text>{entry.mood}</Text>
                                    <Text>{formatDate(entry.time)}</Text>
                                </View>
                                <Text>{entry.emotion}</Text>
                                <Text>{entry.description}</Text>
                                <View style={styles.lineBox} />
                            </View>
                        ))}
                    </View>
                </Page>
            ))}
        </Document>
    );

    return (
        <div>
            {/* Lien de téléchargement du PDF */}
            <PDFDownloadLink document={MyDocument} fileName="M.émotion.pdf">
                <Download />
            </PDFDownloadLink>
        </div>
    );
};

const styles = StyleSheet.create({
    section: {
        margin: 10,
        padding: 10,
    },
    box: {
        margin: 5,
        padding: 5,
        fontSize: 14,
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#34D399',
    },
    line: {
        borderBottom: '1px solid gray',
        marginBottom: 5,
    },
    lineBox: {
        borderBottom: '1px solid rgb(209 213 219)',
        opacity: 0.5,
        marginTop: 5,
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 5,
    }
});

export default PdfGenerator;
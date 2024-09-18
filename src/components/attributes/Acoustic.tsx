import { getAcousticDist } from '../../api/acoustic-dist/route';
import CI from '../CI';

export default function AcousticAnalysis() {
	return <CI title="Acousticness Analysis" getDist={getAcousticDist} />;
}

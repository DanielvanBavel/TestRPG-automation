import testdata from '../data/testdata.json';
import character from '../data/characters.json';

export function getRandomUser() {
	const index = Math.floor(Math.random() * testdata.length);
  	return testdata[index];
}

export function getRandomCharacter() {
	const index = Math.floor(Math.random() * character.length);
  	return character[index];
}